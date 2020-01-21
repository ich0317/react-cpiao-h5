import React from 'react'
import { withRouter } from 'react-router-dom'
import { StickyContainer, Sticky } from 'react-sticky';
import { ListView, List, SearchBar, Toast } from 'antd-mobile';
import './index.scss'
import { getCityList } from '@/api/api';
import { PageLoading } from '@/components/AllLoading/index.js'
const { Item } = List;

function genData(ds, provinceData) {
  const dataBlob = {};
  const sectionIDs = [];
  const rowIDs = [];
  Object.keys(provinceData).forEach((item, index) => {
    sectionIDs.push(item);
    dataBlob[item] = item;
    rowIDs[index] = [];

    provinceData[item].forEach((jj) => {
      rowIDs[index].push(jj.value);
      dataBlob[jj.value] = jj.label;
    });
  });
  return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
}

class City extends React.Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    let getUerPos = JSON.parse(localStorage.getItem("_piaoUserPos"));

    this.state = {
      inputValue: '',
      dataSource,
      list:[],
      activeCity:(getUerPos && getUerPos.posCity) //当前定位城市
    };
  }

  componentDidMount() {
      this.getCitys();
  }
  // 获取城市数据
  getCitys(){
    PageLoading.show();
    getCityList().then(res=>{
      let {code, msg, data} = res;
      if(code === 0){
        this.setState({
          dataSource: genData(this.state.dataSource, this.dataFormat(data.list)),
          list:this.dataFormat(data.list)
        },()=>{
          localStorage.setItem('_piaoCity', JSON.stringify(data.list));
        });
        PageLoading.hide();
      }else{
        Toast.fail(msg, 1.5);
      }
    })
  }
  /**
   * 城市列表转成可循环格式
   * @param { Array } arr 需要转换的数组
   */
  dataFormat(arr){
    let obj = {};
    arr.map(v => {
      let [first] = v.spell;
      !obj[first] ? obj[first] = [v] : obj[first].push(v);
    })
    return obj;
  }

  onSearch = (val) => {
    const pd = { ...this.state.list };
    Object.keys(pd).forEach((item) => {
      const arr = pd[item].filter(jj => jj.spell.toLocaleLowerCase().indexOf(val) > -1);
      if (!arr.length) {
        delete pd[item];
      } else {
        pd[item] = arr;
      }
    });
    this.setState({
      inputValue: val,
      dataSource: genData(this.state.dataSource, pd),
    });
  }

  //从当前定位位置到首页
  activeToHome(city){
    localStorage.setItem("_piaoUserCity", JSON.stringify({ city }));
    this.props.history.push(`/home/${this.state.activeCity}`, {use:true});
  }

  //从城市列表到首页
  listToHome(city){
    localStorage.setItem("_piaoUserCity", JSON.stringify({ city }));
    this.props.history.push(`/home/${city}`, {use:true});
  }

  render() {
    return (<div style={{ paddingTop: '40px', position: 'relative', background:'#f5f5f9' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <SearchBar
          value={this.state.inputValue}
          placeholder="输入城市名"
          onChange={this.onSearch}
          onClear={() => { console.log('onClear'); }}
          onCancel={() => { console.log('onCancel'); }}
        />
      </div>
      
      <ListView.IndexedList
        dataSource={this.state.dataSource}
        className="am-list sticky-list"
        useBodyScroll
        renderSectionWrapper={sectionID => (
          <StickyContainer
            key={`s_${sectionID}_c`}
            className="sticky-container"
            style={{ zIndex: 4 }}
          />
        )}
        renderSectionHeader={sectionData => (
          <Sticky>
            {({
              style,
            }) => (
              <div
                className="sticky"
                style={{
                  ...style,
                  zIndex: 3,
                  background:'#f5f5f9',
                  height:'25px',
                  'lineHeight':'25px'
                }}
              >{sectionData}</div>
            )}
          </Sticky>
        )}
        renderRow={(rowData, w, city) => (<Item onClick={this.listToHome.bind(this, city)}>{rowData}</Item>)}
        renderHeader={() => this.state.activeCity ? (<dl className="area"><dt>你所在的地区</dt><dd onClick={this.activeToHome.bind(this, this.state.activeCity)}><span className="now_location">{this.state.activeCity}</span></dd></dl>) : '定位失败'}
        quickSearchBarStyle={{
          top: 85,
        }}
        delayTime={10}
        delayActivityIndicator={<div style={{ padding: 25, textAlign: 'center' }}>rendering...</div>}
      />
      
    </div>);
  }
}

export default withRouter(City)