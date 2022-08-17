const resp = RESP.aaaaa;

<!-- response.js -->

export const RESP = {
COMMERCIALS: {
ok: true,
result: [
{
title: "금주의 전단광고",
subtext: "대물 손질 민물장어 50% 할인",
img:
"http://ui.ssgcdn.com/cmpt/banner/202103/2021032509540448772796294379_265.jpg",
},
],
},
HOTDEALS: {
ok: true,
result: [
{
name: "모나미 3000 플러스펜 낱개",
price: 200,
brand: "오피스존",
mall: "이마트몰",
},
],
},

  <!-- -------------------------------------------------------- -->

const response = RESPONSE.POST_CHECK
console.log(response)
if(response.success) {
alert(response.msg)
navigate('/')
}else {
alert(response.msg)
navigate('/sign/in')
}
}
