## Let the party begin @19/06/2014

- version 0.0.0

## 功能汇总 （Draft）
1.  租房(，搬家，家具买卖，家政)
2.  注册，登陆
3.  多样性搜索条(房间，价格，地域，类型)
4.  反向推送
5.  询问提示(邮件，短信)
6.  用户体验设计

===========================================================

Caveat:
- Form error message placement is tightly coupled with `<div class="form-control">` using `id` attribute, and is mapped at the client-side JS file by `var formErrDivID` object. This is because SimpleSchema validation failure will return attribute name of the field with error, so that's the only clue to refer back to where the error occurs. So *Any changes to the div id in `<template name="addProperty">` requires updates on `var formErrDivID` too*

