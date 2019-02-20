module.exports = message => {
  let field = message.split("index: ")[1];
  field = field.split(" dup key")[0];
  field = field.substring(0, field.lastIndexOf("_"));
  return field;
};
