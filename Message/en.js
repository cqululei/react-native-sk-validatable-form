/**
 * 校验失败的消息
 *   key是规则名
 *   value可以是消息模板, 可以嵌入参数, 也可以是函数, 函数执行后仍然是消息模板
 *      如果参数是{TITLE}, 表示取当前字段的标题
 *      如果参数是{field}, 表示取字段名为field的标题
 *      如果参数是{i}, i是数字, 表示取参数数组中的第i个
 */
module.exports = {
  isRequired: '{TITLE} is required',
  equals: '{TITLE} must be equal to {1}',
  contains: '{TITLE} must contain "{1}"',
  matches: '{TITLE} doestn\'t meet format requirement',
  isEmail: '{TITLE} must be an email',
  isURL: '{TITLE} must be an url',
  isMACAddress: '{TITLE} must be a MAC address',
  isIP: '{TITLE} must be a IP address',
  isBoolean: '{TITLE} must be a boolean',
  isAlpha: '{TITLE} must be letters',
  isAlphanumeric: '{TITLE} only contain letters and numbers',
  isNumeric: '{TITLE} must be a number',
  isLowercase: '{TITLE} must be lower case',
  isUppercase: '{TITLE} must be upper case',
  isAscii: '{TITLE} must be ASC encoded',
  isInt: '{TITLE} must be an integer',
  isFloat: '{TITLE} must be a float',
  isDecimal: '{TITLE} must be a decimal',
  isHexadecimal: '{TITLE} must be encoded',
  isDivisibleBy: '{TITLE} must be divisible by {1}',
  isHexColor: '{TITLE} must be hex color',
  isJSON: '{TITLE} must be json string',
  isNull: '{TITLE} must be null',
  isLength: (args) => {
    if(args && args.length > 1){
      return '{TITLE} must contain {1}-{2} characters';
    }
    return '{TITLE} no more than {1} characters';
  },
  isByteLength: (args) => {
    if(args && args.length > 1){
      return '{TITLE} must contain {1}-{2} bytes';
    }
    return '{TITLE} no more than {1} bytes';
  },
  isUUID: '{TITLE} must be UUID',
  isMongoId: '{TITLE} must be MongoId',
  isDate: '{TITLE} must be a date',
  isAfter: '{TITLE} must be after {1}',
  isBefore: '{TITLE} must be before {1}',
  isIn: '{TITLE} must be in {1}',
  isCreditCard: '{TITLE} must be credit card',
  isMobilePhone: '{TITLE} must be mobile phone',
  isCurrency: '{TITLE} must be currency',
  isISO8601: '{TITLE} must be ISO8601 endcoded',
  isBase64: '{TITLE} must be Base64 endcoded',
  isWhitelisted: '{TITLE} must be in white list {1}',
};
