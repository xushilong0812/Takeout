//星星组件
function star(data) {
  let index = data
    let arr1 = []
    let average =data.rating
    let int = Math.floor(average)
    for (var j = 1; j <= int; j++) {
      arr1.push("/img/star-full.png")
    }
    if (average * 10 % 10 >= 5) {
      arr1.push("/img/star-half.png")
    }
    let num = 5 - arr1.length
    for (let i = 0; i < num; i++) {
      arr1.push("/img/star-empty.png")
    }
    index.arr = arr1
    
  }
//data 查询语句

  module.exports = {
    star: star
  }