/*
 * @Author: 田想兵
 * @Date: 2020-10-27 17:58:35
 * @LastEditTime: 2020-10-30 15:00:31
 * @github: https://github.com/tianxiangbing
 * @Contact: 55342775@qq.com
 */

import React, { useState, useEffect } from 'react';

function getNumber(value) {
  if (!isNaN(value)) {
    return Number(value);
  } else {
    return 0;
  }
}
/**
 * @description: 两个数值比较
 * @param {*}
 * @return {*}
 */
function compare(a,b){
  if(typeof a ==='undefined' || typeof b ==='undefined'){
    return 0;
  }
  let av = Number(String(a).replace(/\,/g,''));
  let bv = Number(String(b).replace(/\,/g,''));
  if(av >bv){
    return 1;
  }
  if(av<bv){
    return -1;
  }
  return 2;
}
/**
 * @description: 针对数字的变化而变化,
 * @param {value} 传入值
 * @param {defaultValue} 如果传入的是非数字的话，展示的默认值
 * @param {timer} 传入值则定时展示显示效果
 * @return {*}
 */
export default function NumberChange(props) {
  let [value, setValue] = useState(props.value)
  let [cls, setCls] = useState([props.className]);
  let [timer, setTimer] = useState(null);
  useEffect(() => {
    let compareValue = compare(props.value , value);
    if (compareValue ===1) {
      //上涨
      cls[1] = 'x-up'
      props.onChange && props.onChange('up', props.value, value);
    } 
    if(compareValue ===-1){
      //下跌
      cls[1] = 'x-down'
      props.onChange && props.onChange('down', props.value, value);
    }
    if(compareValue ===0 || compareValue ==2){
      cls[1] ='';
    }
    if (props.timer) {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
      timer = setTimeout(() => {
        cls[1] = '';
        setCls(cls);
        clearTimeout(timer);
        setTimer(null);
      }, props.timer);
      setTimer(timer)
    }
    setCls(cls);
    setValue(props.value);
  }, [props.value]);
  useEffect(()=>{
    return ()=>{
      // console.log('unmount')
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }
    }
  },[])
  let clss = cls.join(' ');
  return <div className={clss}><i></i>{value}</div>
}
