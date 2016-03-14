/**
 * 校验失败的消息
 *   key是规则名
 *   value可以是消息模板, 可以嵌入参数, 也可以是函数, 函数执行后仍然是消息模板
 *      如果参数是{TITLE}, 表示取当前字段的标题
 *      如果参数是{field}, 表示取字段名为field的标题
 *      如果参数是{i}, i是数字, 表示取参数数组中的第i个
 */
module.exports = {
  isRequired: '{TITLE}不能为空',
  equals: '{TITLE}必须等于{1}',
  contains: '{TITLE}必须包含"{1}"',
  matches: '{TITLE}不符合要求的格式',
  isEmail: '{TITLE}必须是邮件地址格式',
  isURL: '{TITLE}必须是url',
  isMACAddress: '{TITLE}必须是MAC地址格式',
  isIP: '{TITLE}必须是IP地址格式',
  isBoolean: '{TITLE}必须是布尔类型',
  isAlpha: '{TITLE}只能包含字母',
  isAlphanumeric: '{TITLE}只能包含数字和字母',
  isNumeric: '{TITLE}必须是数字',
  isLowercase: '{TITLE}必须是小写字母',
  isUppercase: '{TITLE}必须是大写字母',
  isAscii: '{TITLE}必须是ASC编码',
  isInt: '{TITLE}必须是整数',
  isFloat: '{TITLE}必须是浮点数',
  isDecimal: '{TITLE}必须是浮点数',
  isHexadecimal: '{TITLE}必须是16进制编码',
  isDivisibleBy: '{TITLE}必须是{1}的倍数',
  isHexColor: '{TITLE}必须是16进制的颜色',
  isJSON: '{TITLE}必须是JSON字符串',
  isNull: '{TITLE}必须为空',
  isLength: (args) => {
    if(args && args.length > 1){
      return '{TITLE}必须为{1}-{2}个字符(1个汉字为2个字符)';
    }
    return '{TITLE}必须为{1}个字符(1个汉字为2个字符)';
  },
  isByteLength: (args) => {
    if(args && args.length > 1){
      return '{TITLE}必须为{1}-{2}个字节';
    }
    return '{TITLE}必须为{1}个字节';
  },
  isUUID: '{TITLE}必须是UUID',
  isMongoId: '{TITLE}必须是MongoId',
  isDate: '{TITLE}必须是日期格式',
  isAfter: '{TITLE}必须在大于日期{1}',
  isBefore: '{TITLE}必须在小于日期{1}',
  isIn: '{TITLE}必须包含在{1}之中',
  isCreditCard: '{TITLE}必须是身份证格式',
  isMobilePhone: '{TITLE}必须是电话格式',
  isCurrency: '{TITLE}必须是货币格式',
  isISO8601: '{TITLE}必须是ISO8601编码',
  isBase64: '{TITLE}必须是Base64编码',
  isWhitelisted: '{TITLE}必须在白名单{1}中',
};
