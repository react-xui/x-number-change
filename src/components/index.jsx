/*
 * @Author: 田想兵
 * @Date: 2020-10-27 17:58:35
 * @LastEditTime: 2020-10-27 20:57:38
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
    if (getNumber(props.value) > value) {
      //上涨
      cls[1] = 'x-up'
      props.onChange && props.onChange('up', props.value, value);
    } else {
      //下跌
      cls[1] = 'x-down'
      props.onChange && props.onChange('down', props.value, value);
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
