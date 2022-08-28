function filter(k){
    let u={}
    k.split("\n").map(n=>n.split('\t').filter(n=>n)).map((n)=>{o={};u[n[1]]={"SID":n[0],"UTC":n.length<4 ? n[2].split(" ")[1].split(':').map(n=>parseInt(n)) : n[3].split(" ")[1].split(':').map(n=>parseInt(n))}})
    return u
}   
const puppeteer       = require('puppeteer-core');
const {writeFileSync} = require('fs')
let zones=['https://www.timeanddate.com/time/zones/africa', 'https://www.timeanddate.com/time/zones/antarctica', 'https://www.timeanddate.com/time/zones/asia', 'https://www.timeanddate.com/time/zones/atlantic', 'https://www.timeanddate.com/time/zones/au', 'https://www.timeanddate.com/time/zones/caribbean', 'https://www.timeanddate.com/time/zones/ca', 'https://www.timeanddate.com/time/zones/eu', 'https://www.timeanddate.com/time/zones/indian-ocean', 'https://www.timeanddate.com/time/zones/military', 'https://www.timeanddate.com/time/zones/na', 'https://www.timeanddate.com/time/zones/pacific', 'https://www.timeanddate.com/time/zones/sa']

async function fun(){
    const browser = await puppeteer.launch({
        headless:false,
        executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe" 
    })
    const page = await browser.newPage();
    for(i=0;i<zones.length;i++){
        await page.goto(zones[i])
        await page.waitForSelector('#tz-abb > tbody')
        let table = await page.evaluate(()=>document.querySelector('#tz-abb > tbody').innerText)
        let head  = await page.evaluate(()=>document.querySelector('body > div.main-content-div > main > div > article > h3').innerText)
        head=head.split('–')[1].split(" ").filter(n=>n).join("_")
        table = filter(table)
        writeFileSync(head+'.json',JSON.stringify(table))
        console.log(head+'.json',"wriiten")
    }
       
 
}

fun()
           