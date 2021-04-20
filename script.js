// ======== api 이름 ============
// acc_trade_value 거래대금
// acc_trade_value_24H 거래대금(최근 24시간)
// closing_price 종가
// fluctate_24H 전일대비(금액)
// fluctate_rate_24H 전일대비(%)
// max_price 고가
// min_price 저가
// opening_price 시가
// prev_closing_price 전일종가
// units_traded 거래량
// units_traded_24H 거래량(최근 24시간)

// ======== 참고 ============
// console.log(standard);
// console.log(anName[0]); // ["AAVE", {…}]
// console.log(anName[0][0]); // AAVE
// console.log(anName[0][1]); // {opening_price: "498000", ...}

// ==================================================================================== START

// api 불러오기
const request = new XMLHttpRequest();
const url = "https://api.bithumb.com/public/ticker/ALL";
request.open("GET", url, false);
request.send();
let obj = JSON.parse(request.responseText);

// 배열화
let standard = Object.entries(obj.data);

// .json 가져오기
import coinName from './coinName.js';
let coinNameArr = coinName;

let table = document.querySelector('table');
let symbolSortABtn = document.querySelector('.symbolSortABtn');
let symbolSortZBtn = document.querySelector('.symbolSortZBtn');

// 총 개수
let len = document.querySelector('.len');
len.textContent = standard.length - 1;

symbolSortABtn.addEventListener('click', makeTable); // 심볼 a ---> z 정렬
symbolSortZBtn.addEventListener('click', makeTable); // 심볼 z ---> a 정렬


function makeTable() {
    // 버튼별 데이터 정렬 구분
    if(this.className === 'symbolSortABtn') {
        standard = standard.sort();
    } else if(this.className === 'symbolSortZBtn') {
        standard = standard.sort().reverse();
    }

    // 기존 데이터 삭제
    let tbody = document.querySelector('tbody');
    tbody.remove();

    // 데이터 만들기
    setData();
};

function setData() {
    let tbody = document.createElement('tbody');
    standard.map((item) => {
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        if (item[0] === 'date') {
            return;
        } else {
            // 종목명
            td.innerHTML = item[0];
            tr.append(td);
    
            // 심볼명
            coinNameArr.forEach((item2) => {
                let td = document.createElement('td');
                if(item2.symbol == item[0]) {
                    td.innerHTML = item2.name;
                    tr.append(td);
                }
            });        
    
            // 나머지 테이블
            for (let i = 0; i < 3; i++) {
                let td = document.createElement('td');
                if (i === 0) {
                    // 현재가
                    const request = new XMLHttpRequest();
                    let url = "https://api.bithumb.com/public/transaction_history/";
                    let symbol = item[0];
                    url = url + symbol;
                    request.open("GET", url, false);
                    request.send();
                    let obj1 = JSON.parse(request.responseText);
    
                    // 배열화
                    let standard1 = Object.entries(obj1.data);
    
                    td.innerHTML = standard1[19][1].price;
                } else if (i === 1) {
                    td.innerHTML = parseInt(item[1].acc_trade_value_24H).toLocaleString();
                } else if (i === 2) {
                    td.innerHTML = parseInt(item[1].units_traded_24H).toLocaleString();
                }
                tr.append(td);
            }
            tbody.append(tr);
            table.append(tbody);
        }
    })
};