const {DOMAIN, PORT} = require('../constant')
const myRmHost = `http://${DOMAIN}:${PORT}`
// const myRmHost = 'http://bbs.h3xgiii.site:8355'

module.exports = function(token, isForgetPwd = true) {
  const PROMPT_WORDS = ['账号激活消息', '账号激活链接']
  return (
    `<center style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
      <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f5f5f5" style="text-align: center;">
        <tbody>
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" bgcolor="#f5f5f5">
                <tbody>
                  <tr>
                    <td>
                      <div
                        style="margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto; padding-left:0px; padding-right:0px;">
                        <table align="center"
                          style="border-spacing:0;font-family:sans-serif;color:#f5f5f5;Margin:0 auto;width:100%;"
                          bgcolor="#f5f5f5">
                          <tbody>
                            <tr>
                              <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"
                                bgcolor="#f5f5f5">
                                <table width="100%" style="border-spacing:0;font-family:sans-serif;color:#f5f5f5;"
                                  bgcolor="#f5f5f5">
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding-bottom:0px; padding-top: 0px;padding-left:20px;padding-right:20px;background-color:#f5f5f5;color:#f5f5f5;width:100%;font-size:1px;line-height:1px;text-align:left; display:none !important; visibility:hidden !important;">
                                        <p class="prehdr"
                                          style="text-align:left; line-height:6px; Margin-top:0px; Margin-bottom:0px;">
                                          此电子邮件中的链接仅在 2 小时内有效。请立即打开以重置密码并登录您的账户。请阅读里面的说明。 &nbsp;&zwnj; &zwnj; &zwnj;
                                        &zwnj; &zwnj; &zwnj; </p>
                                        <div style="display: none; max-height: 0px; overflow: hidden;">
                                          &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj;
                                          &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj;
                                          &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj;
                                          &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj;
                                          &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj;
                                          &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj;
                                          &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj;
                                          &zwnj;&nbsp; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj;
                                          &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj;
                                          &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj;
                                          &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj; &zwnj;

                                      </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f5f5f5">
                <tbody>
                  <tr>
                    <td bgcolor="#f5f5f5"
                      style="background-color:#f5f5f5;padding-top:0;padding-right:0;padding-left:0;padding-bottom:0;">
                      <div
                        style="max-width:640px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto; padding-left:0; padding-right:0;">

                        <table cellpadding="0" cellspacing="0" border="0" align="center" width="100%"
                          style="font-family:sans-serif;color:#111;">
                          <tbody>
                            <tr>
                              <td style="padding-top:10px;padding-right:0;padding-bottom:20px;padding-left:0;">
                                <table cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                                  <tbody>
                                    <tr>
                                      <td width="174" align="left" class="stretch"
                                        style="padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" align="left">
                                          <tbody>
                                            <tr>
                                              <td class="mobile-padding-fix mobiletextalign"
                                                style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:16px;">
                                                <a href="${myRmHost}"
                                                  rel="noopener" target="_blank"><img class="stretch-img"
                                                    src="${myRmHost}/public/bbs-logo.png"
                                                    width="158" height="53" border="0"
                                                    style="display:block; color:#111111; font-family:Arial, sans-serif; font-size:12px;border:0;width:100%;max-width:158px;min-width:20px;height:auto;" /></a>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                      <td align="right" class="stretch"
                                        style="padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                          <tbody>
                                            <tr>
                                              <td align="right" class="mobile-padding-fix-right mobiletextalign"
                                                style="padding-top:0;padding-bottom:0px;padding-left:0;padding-right:20px;text-align:right;">
                                                <p class="mobiletextalign"
                                                  style="margin-top:0px; margin-bottom:0px;font-family:'微软雅黑', 'Microsoft YaHei', 'Hiragino Sans GB', sans-serif;font-size:13px; line-height:21px;">
                                                  需要帮助吗？ <a
                                                    href="#"
                                                    style="text-decoration:underline; color:#09757a; " rel="noopener"
                                                    target="_blank">联系我们。</a><br />客户编号： UID-XYZW
                                              </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>


              <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f5f5f5">
                <tbody>
                  <tr>
                    <td bgcolor="#f5f5f5"
                      style="background-color:#f5f5f5;padding-top:0;padding-right:0;padding-left:0;padding-bottom:0;">
                      <div
                        style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto; padding-left:20px; padding-right:20px;">

                        <table bgcolor="#fff" width="100%" align="center" border="0" cellspacing="0" cellpadding="0"
                          style="font-family:serif;color:#111;">
                          <tbody>
                            <tr>
                              <td bgcolor="#fff" align="left" class="h2-primary-mobile"
                                style="padding-top:60px;padding-bottom:0;padding-right:40px;padding-left:40px;text-align:left;background-color:#fff;font-size:32px; line-height:42px; font-weight:bold; font-family:'Hiragino Sans GB', sans-serif, '微软雅黑', 'Microsoft YaHei';">

                                <span><a
                                  href="${myRmHost}/${isForgetPwd?"pwd-reset":"active-email"}/${token}"
                                  style="text-decoration:none;color:#111;" rel="noopener"
                                  target="_blank">${isForgetPwd ? "密码重置消息" : PROMPT_WORDS[0]}</a></span>

                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>


              <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f5f5f5">
                <tbody>
                  <tr>
                    <td bgcolor="#f5f5f5"
                      style="background-color:#f5f5f5;padding-top:0;padding-right:0;padding-left:0;padding-bottom:0;">
                      <div
                        style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto; padding-left:20px; padding-right:20px;">

                        <table bgcolor="#fff" width="100%" align="left" border="0" cellspacing="0" cellpadding="0"
                          style="font-family:sans-serif;color:#111111;">
                          <tbody>
                            <tr>
                              <td bgcolor="#fff" align="left"
                                style="background-color:#fff;padding-top:40px;padding-bottom:0;padding-right:40px;padding-left:40px;text-align:left;">
                                <table border="0" cellpadding="0" cellspacing="0" align="left" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="left"
                                        style="padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;">
                                        <table border="0" cellspacing="0" cellpadding="0" align="left">
                                          <tbody>
                                            <tr>
                                              <td align="center" bgcolor="#111"
                                                style="border:1px solid #111;font-size:16px; line-height: 20px; font-weight:bold;font-family:'Hiragino Sans GB', sans-serif, '微软雅黑', 'Microsoft YaHei';background-color:#111;">
                                                <span>
                                                  <a href="${myRmHost}/${isForgetPwd?"pwd-reset":"active-email"}/${token}"
                                                    style="text-decoration: none; background-color: #111; border-top: 20px solid #111; border-bottom: 20px solid #111; border-left: 40px solid #111; border-right: 40px solid #111; display: inline-block; mso-table-lspace:0pt; mso-table-rspace:0pt;  color: #FFFFFF;text-align:center;"
                                                    rel="noopener" target="_blank">${isForgetPwd? '重置密码':'激活链接'} ▶</a>
                                                </span>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f5f5f5">
                <tbody>
                  <tr>
                    <td bgcolor="#f5f5f5"
                      style="background-color:#f5f5f5;padding-top:0;padding-right:0;padding-left:0;padding-bottom:0;">
                      <div
                        style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto; padding-left:20px; padding-right:20px;">

                        <table bgcolor="#fff" width="100%" align="center" border="0" cellspacing="0" cellpadding="0"
                          style="font-family:sans-serif;color:#111;">
                          <tbody>
                            <tr>
                              <td dir="ltr" bgcolor="#fff" align="left"
                                style="padding-top:40px;padding-bottom:0;padding-right:40px;padding-left:40px;text-align:left;background-color:#fff;">
                                <p
                                  style="Margin-top:0px;Margin-bottom:0px;font-family:'微软雅黑', 'Microsoft YaHei', 'Hiragino Sans GB', sans-serif;font-size:14px; line-height:24px;">
                                  ${isForgetPwd? "单击上面的按钮后，系统将提示您完成以下步骤：" : ''}
                              </p>

                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              ${isForgetPwd? `
                <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f5f5f5">
                <tbody>
                  <tr>
                    <td bgcolor="#f5f5f5"
                      style="background-color:#f5f5f5;padding-top:0;padding-right:0;padding-left:0;padding-bottom:0;">
                      <div
                        style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto; padding-left:20px; padding-right:20px;">

                        <table bgcolor="#fff" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                          <tbody>
                            <tr>
                              <td bgcolor="#fff"
                                style="background-color:#fff;padding-top:10px;padding-bottom:0px;padding-right:40px;padding-left:40px;">
                                <table cellpadding="0" cellspacing="0" border="0" align="left" width="100%"
                                  style="font-family:sans-serif;color:#111;">
                                  <tbody>
                                    <tr>
                                      <td valign="top" width="5%" align="right"
                                        style="padding-top:0px;padding-bottom:0px;padding-left:0;padding-right:0px;">
                                        <p
                                          style="Margin-top:0px;Margin-bottom:0px;text-align:right;font-family:'微软雅黑', 'Microsoft YaHei', 'Hiragino Sans GB', sans-serif; font-size:14px; line-height: 24px;">
                                          1.</p>
                                      </td>
                                      <td valign="top" width="95%" align="left"
                                        style="padding-top:0px;padding-bottom:0px;padding-left:10px;padding-right:0;text-align:left;">
                                        <p
                                          style="Margin-top:0px;Margin-bottom:0px;font-family:'微软雅黑', 'Microsoft YaHei', 'Hiragino Sans GB', sans-serif;font-size:14px; line-height: 24px;">
                                          输入新密码。</p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f5f5f5">
                <tbody>
                  <tr>
                    <td bgcolor="#f5f5f5"
                      style="background-color:#f5f5f5;padding-top:0;padding-right:0;padding-left:0;padding-bottom:0;">
                      <div
                        style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto; padding-left:20px; padding-right:20px;">

                        <table bgcolor="#fff" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                          <tbody>
                            <tr>
                              <td bgcolor="#fff"
                                style="background-color:#fff;padding-top:10px;padding-bottom:0px;padding-right:40px;padding-left:40px;">
                                <table cellpadding="0" cellspacing="0" border="0" align="left" width="100%"
                                  style="font-family:sans-serif;color:#111;">
                                  <tbody>
                                    <tr>
                                      <td valign="top" width="5%" align="right"
                                        style="padding-top:0px;padding-bottom:0px;padding-left:0;padding-right:0px;">
                                        <p
                                          style="Margin-top:0px;Margin-bottom:0px;text-align:right;font-family:'微软雅黑', 'Microsoft YaHei', 'Hiragino Sans GB', sans-serif; font-size:14px; line-height: 24px;">
                                          2.</p>
                                      </td>
                                      <td valign="top" width="95%" align="left"
                                        style="padding-top:0px;padding-bottom:0px;padding-left:10px;padding-right:0;text-align:left;">
                                        <p
                                          style="Margin-top:0px;Margin-bottom:0px;font-family:'微软雅黑', 'Microsoft YaHei', 'Hiragino Sans GB', sans-serif;font-size:14px; line-height: 24px;">
                                          确认新密码。</p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f5f5f5">
                <tbody>
                  <tr>
                    <td bgcolor="#f5f5f5"
                      style="background-color:#f5f5f5;padding-top:0;padding-right:0;padding-left:0;padding-bottom:0;">
                      <div
                        style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto; padding-left:20px; padding-right:20px;">

                        <table bgcolor="#fff" cellpadding="0" cellspacing="0" border="0" align="center" width="100%">
                          <tbody>
                            <tr>
                              <td bgcolor="#fff"
                                style="background-color:#fff;padding-top:10px;padding-bottom:0px;padding-right:40px;padding-left:40px;">
                                <table cellpadding="0" cellspacing="0" border="0" align="left" width="100%"
                                  style="font-family:sans-serif;color:#111;">
                                  <tbody>
                                    <tr>
                                      <td valign="top" width="5%" align="right"
                                        style="padding-top:0px;padding-bottom:0px;padding-left:0;padding-right:0px;">
                                        <p
                                          style="Margin-top:0px;Margin-bottom:0px;text-align:right;font-family:'微软雅黑', 'Microsoft YaHei', 'Hiragino Sans GB', sans-serif; font-size:14px; line-height: 24px;">
                                          3.</p>
                                      </td>
                                      <td valign="top" width="95%" align="left"
                                        style="padding-top:0px;padding-bottom:0px;padding-left:10px;padding-right:0;text-align:left;">
                                        <p
                                          style="Margin-top:0px;Margin-bottom:0px;font-family:'微软雅黑', 'Microsoft YaHei', 'Hiragino Sans GB', sans-serif;font-size:14px; line-height: 24px;">
                                          点击提交。</p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              ` : ''}
              <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f5f5f5">
                <tbody>
                  <tr>
                    <td bgcolor="#f5f5f5"
                      style="background-color:#f5f5f5;padding-top:0;padding-right:0;padding-left:0;padding-bottom:0;">
                      <div
                        style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto; padding-left:20px; padding-right:20px;">

                        <table bgcolor="#fff" width="100%" align="center" border="0" cellspacing="0" cellpadding="0"
                          style="font-family:sans-serif;color:#111;">
                          <tbody>
                            <tr>
                              <td bgcolor="#fff" align="left"
                                style="padding-top:40px;padding-bottom:0;padding-right:40px;padding-left:40px;text-align:left;background-color:#fff; font-weight:bold; font-family: 'Hiragino Sans GB', sans-serif, '微软雅黑', 'Microsoft YaHei';font-size:18px; line-height:28px;">

                                <span><a
                                  href="${myRmHost}/${isForgetPwd?"pwd-reset":"active-email"}/${token}"
                                  style="text-decoration:none; color:#111;" rel="noopener" target="_blank">此链接只能使用一次。将在
                                  10分钟后失效。</a></span>

                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f5f5f5">
                <tbody>
                  <tr>
                    <td bgcolor="#f5f5f5"
                      style="background-color:#f5f5f5;padding-top:0;padding-right:0;padding-left:0;padding-bottom:0;">
                      <div
                        style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto; padding-left:20px; padding-right:20px;">

                        <table bgcolor="#fff" width="100%" align="center" border="0" cellspacing="0" cellpadding="0"
                          style="font-family:sans-serif;color:#111;">
                          <tbody>
                            <tr>
                              <td dir="ltr" bgcolor="#fff" align="left"
                                style="padding-top:10px;padding-bottom:0;padding-right:40px;padding-left:40px;text-align:left;background-color:#fff;">

                                <p
                                  style="Margin-top:0px;Margin-bottom:0px;font-family:'微软雅黑', 'Microsoft YaHei', 'Hiragino Sans GB', sans-serif;font-size:14px; line-height:24px;">
                                  如果您没有申请${isForgetPwd ? "重置密码": PROMPT_WORDS[1]}，或者您认为自己是误收到本邮件，请勿理会此电子邮件。
                              </p>

                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>


              <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f5f5f5">
                <tbody>
                  <tr>
                    <td bgcolor="#f5f5f5" style="padding-top:0px; padding-bottom:0px;">
                      <div
                        style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto; padding-left:20px; padding-right:20px;">

                        <table bgcolor="#fff" align="center"
                          style="border-spacing:0;font-family:sans-serif;color:#111;margin:0 auto;width:100%;max-width:600px;">
                          <tbody>
                            <tr>
                              <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
                                <table width="100%" style="border-spacing:0;font-family:sans-serif;color:#111;">
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding-top:60px;padding-bottom:0px;padding-left:40px;padding-right:40px;background-color:#fff;width:100%;text-align:left;">
                                        <p style="margin-top:0px; line-height:0px; margin-bottom:0px;font-size:4px;">
                                          &nbsp;</p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>


              <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f5f5f5">
                <tbody>
                  <tr>
                    <td bgcolor="#f5f5f5" style="padding-top:0px; padding-bottom:0px;">
                      <div
                        style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto; padding-left:20px; padding-right:20px;">

                        <table bgcolor="#f5f5f5" align="center"
                          style="border-spacing:0;font-family:sans-serif;color:#111;margin:0 auto;width:100%;max-width:600px;">
                          <tbody>
                            <tr>
                              <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
                                <table width="100%" style="border-spacing:0;font-family:sans-serif;color:#111;">
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding-top:40px;padding-bottom:0px;padding-left:40px;padding-right:40px;background-color:#f5f5f5;width:100%;text-align:left;">
                                        <p style="margin-top:0px; line-height:0px; margin-bottom:0px;font-size:4px;">
                                          &nbsp;</p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f5f5f5">
                <tbody>
                  <tr>
                    <td bgcolor="#f5f5f5"
                      style="background-color:#f5f5f5;padding-top:0;padding-right:0;padding-left:0;padding-bottom:0;">
                      <div
                        style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto; padding-left:20px; padding-right:20px;">

                        <table width="100%" align="left" border="0" cellspacing="0" cellpadding="0"
                          style="font-family:sans-serif;color:#767676;">
                          <tbody>
                            <tr>
                              <td align="left"
                                style="padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;text-align:left;">

                                <p
                                  style="text-align:left;Margin-top:0px;Margin-bottom:0px;font-family:'微软雅黑', 'Microsoft YaHei', 'Hiragino Sans GB', sans-serif;font-size:12px;line-height:22px;">
                                  请勿回复此电子邮件。发送到此邮箱的电子邮件将不予回复。
                              </p>

                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f5f5f5">
                <tbody>
                  <tr>
                    <td bgcolor="#f5f5f5"
                      style="background-color:#f5f5f5;padding-top:0;padding-right:0;padding-left:0;padding-bottom:0;">
                      <div
                        style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto; padding-left:20px; padding-right:20px;">

                        <table width="100%" align="left" border="0" cellspacing="0" cellpadding="0"
                          style="font-family:sans-serif;color:#767676;">
                          <tbody>
                            <tr>
                              <td align="left"
                                style="padding-top:10px;padding-bottom:0;padding-right:0;padding-left:0;text-align:left;">

                                <p
                                  style="text-align:left;Margin-top:0px;Margin-bottom:0px;font-family:'微软雅黑', 'Microsoft YaHei', 'Hiragino Sans GB', sans-serif;font-size:12px;line-height:22px;">
                                  版权 © 1996-2021 年 BBSMINI STAND ALONE COMPLEX Solid State Society O.S.T.保留所有权利。
                              </p>

                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f5f5f5">
                <tbody>
                  <tr>
                    <td bgcolor="#f5f5f5" style="padding-top:0px; padding-bottom:0px;">
                      <div
                        style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto; padding-left:20px; padding-right:20px;">

                        <table bgcolor="#f5f5f5" align="center"
                          style="border-spacing:0;font-family:sans-serif;color:#111;margin:0 auto;width:100%;max-width:600px;">
                          <tbody>
                            <tr>
                              <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
                                <table width="100%" style="border-spacing:0;font-family:sans-serif;color:#111;">
                                  <tbody>
                                    <tr>
                                      <td
                                        style="padding-top:25px;padding-bottom:0px;padding-left:40px;padding-right:40px;background-color:#f5f5f5;width:100%;text-align:left;">
                                        <p style="margin-top:0px; line-height:0px; margin-bottom:0px;font-size:4px;">
                                          &nbsp;</p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>


            </td>
          </tr>
        </tbody>
      </table>
      <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f5f5f5">
        <tbody>
          <tr>
            <td bgcolor="#f5f5f5" style="padding-top:0px; padding-bottom:0px;">
              <div
                style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto; padding-left:20px; padding-right:20px;">

                <table bgcolor="#f5f5f5" align="center"
                  style="border-spacing:0;font-family:sans-serif;color:#111;margin:0 auto;width:100%;max-width:600px;">
                  <tbody>
                    <tr>
                      <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;">
                        <table width="100%" style="border-spacing:0;font-family:sans-serif;color:#111;">
                          <tbody>
                            <tr>
                              <td
                                style="padding-top:20px;padding-bottom:0px;padding-left:40px;padding-right:40px;background-color:#f5f5f5;width:100%;text-align:left;">
                                <p style="margin-top:0px; line-height:0px; margin-bottom:0px;font-size:4px;">&nbsp;</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </center>
    `
    
  )
}
