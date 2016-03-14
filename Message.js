/**
 * 校验失败的消息
 *   key是规则名
 *   value可以是消息模板, 可以嵌入参数, 也可以是函数, 函数执行后仍然是消息模板
 *      如果参数是{TITLE}, 表示取当前字段的标题
 *      如果参数是{field}, 表示取字段名为field的标题
 *      如果参数是{i}, i是数字, 表示取参数数组中的第i个
 */
var messages = {
  cn: require('./Message/cn'), // 中文
  en: require('./Message/en'), // 英文
};

var language = 'en'; // 语言

module.exports = {
  // 切换/添加其他语言的消息
  setLanguage(lang, msgs = null){
    language = lang;
    if(msgs){
      messages[lang] = msgs;
    }
  },
  // 添加错误消息
  addMessage(rule, message){
    messages[language][rule] = message;
  },
  // 翻译校验错误消息: 将参数+其他字段标题替换到消息中
  translate(rule, args, titles){
    var msg = messages[language][rule];
    if(!msg){
      return titles['TITLE'] + '不满足规则' + rule;
    }
    // 如果是函数， 则先执行
    if(typeof msg === 'function'){
      msg = msg(args);
    }
    // 替换变量
    return  msg.replace(/{([^}]+)}/g, function (all, name) {
      if(/^\d+$/.test(name)){ // 如果是数字, 则替换参数值
        return args[name]
      }else{// 否则, 替换字段标题
        return titles[name];
      }
    });
  }
}
