const puppeteer = require("puppeteer")
require("dotenv").config()
const chromium = require("chromium")








async function getAutoWorldPageData(page, iterate) {
    let imgUrl = await getImgUrl(
      page,
      `//*[@id="frmDefault"]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[1]/a/img`
    )
    let title = await getTxtContent(page, `//*[@id="frmDefault"]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[2]/div[1]/a/h6`
   )
    let km = await getTxtContent(
      page,
      `//*[@id="frmDefault"]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[2]/div[5]/div/text()`
    )
    km = km.replace(/\s+/g, " ").trim().split(",")
  
    let price = await getTxtContent(
      page,
      `//*[@id="frmDefault"]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[2]/span/span/span/span`
    )
    let pageUrl = await getPageUrl(
      page,
      `//*[@id="frmDefault"]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[1]/a`
    )

      let cc = km[4]
      let type = km[3]
      let transmission = km[2]
  
    return await  ({
      aw_carimage: imgUrl,
      aw_carname: title.replace(/\s+/g, " ").trim(),
      aw_price: price !=undefined?parseInt(price.replace(/\D/g, '')):null,
      aw_km: parseInt(km[0] + km[1]),
      aw_cc: transmission != 'Electric'?parseInt( cc.replace(/\D/g, '')):0,
      aw_type: type!=undefined?type:null,
      aw_transmission: transmission,
      aw_pageurl: pageUrl,
    })
}

async function getCheapCarsPageData(page,iterate){
let imgUrl = await getImgUrl(
    page,
    `//*[@id="vehicle-list-results"]/li[${iterate}]/div[1]/div/div[1]/a/img`
  )
  let title = await getTxtContent(
    page,
    `//*[@id="vehicle-list-results"]/li[${iterate}]/div[1]/div/div[2]/h6/a`
  )
  let km = await getTxtContent(
    page,
    `//*[@id="vehicle-list-results"]/li[${iterate}]/div[1]/div/div[2]/ul/li[1]`
    
  )

  let cc = await getTxtContent(
    page,
    `//*[@id="vehicle-list-results"]/li[${iterate}]/div[1]/div/div[2]/ul/li[4]`
  )
  let transmission = await getTxtContent(
    page,
    `//*[@id="vehicle-list-results"]/li[${iterate}]/div[1]/div/div[2]/ul/li[3]`
  )
  let price = await getTxtContent(
    page,
    `//*[@id="vehicle-list-results"]/li[${iterate}]/div[1]/div/div[2]/div[1]/text()`
  )

  let type = await getTxtContent(
    page,
    `//*[@id="vehicle-list-results"]/li[${iterate}]/div[1]/div/div[2]/ul/li[2]`
  )

  let pageUrl = await getPageUrl(
    page,
    `//*[@id="vehicle-list-results"]/li[${iterate}]/div[1]/div/div[1]/a`
  )


  cc = parseInt(cc.replace(/\D/g, ''))
  if(Number.isInteger(cc) == false) cc = 0

  price = parseInt(price.replace(/\D/g, ''))
  if(Number.isInteger(price) == false) price = 0

  return await({
    cc_carimage: imgUrl,
    cc_carname: title.replace(/\s+/g, " ").trim(),
    cc_price: price,
    cc_km: parseInt(km.replace(/\D/g, '')),
    cc_cc: cc,
    cc_type: type!=undefined?type:"0",
    cc_transmission: transmission,
    cc_pageurl: pageUrl,
  }) 
}

async function getCoventryCarsPageData(page, iterate) {
    //identify element with class name
    
    let imgUrl = await getImgUrl(
      page,
      `//*[@id="frmDefault"]/div[3]/div/div[2]/div[2]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[1]/a/img`
    )
    let title = await getTxtContent(
      page,
      `//*[@id="frmDefault"]/div[3]/div/div[2]/div[2]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[2]/div[1]/a/h6/text()`
    )
  
    let km = await getTxtContent(
      page,
      `//*[@id="frmDefault"]/div[3]/div/div[2]/div[2]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[2]/div[5]/div/text()`
    )
  
    km = km.replace(/\s+/g, " ").trim().split(",")
  
  
    let price = await getTxtContent(
      page,
      `/html/body/form/div[3]/div/div[2]/div[2]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[2]/span/span[1]/span/span`
    )
  
  
    let pageUrl = await getPageUrl(
      page,
      `//*[@id="frmDefault"]/div[3]/div/div[2]/div[2]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[1]/a`
    )

    if(pageUrl == "N/A") return
    let type = km[3]
    let cc  
    if(type === 'Electric' || km[4] == undefined ) {
      cc ='0'
    }else cc = km[4].replace(/\D/g, '')

    let transmission = km[2]
    return  await{
      conc_carimage: imgUrl,
      conc_carname: title.replace(/\s+/g, " ").trim(),
      conc_price: price !=undefined?parseInt(price.replace(/\D/g, '')):null,
      conc_km: parseInt(km[0] + km[1]),
      conc_type: type,
      conc_transmission: transmission,
      conc_cc: parseInt(cc),
      conc_pageurl: pageUrl,
    }
  }

  async function getValueMotrosPageData(page, iterate) {
    let imgUrl = await getImgUrl(
      page,
      `//*[@id="frmDefault"]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[1]/a/img`
    )
    let title = await getTxtContent(
      page,
      `//*[@id="frmDefault"]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[2]/div[1]/a/h6`
    )
  
    let km = await getTxtContent(
      page,
      `//*[@id="frmDefault"]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[2]/div[5]/div`
    )
  
    km = km.replace(/\s+/g, " ").trim().split(",")
  
    let price = await getTxtContent(
      page,
      `//*[@id="frmDefault"]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[2]/span/span/span/span`
    )
  
    let pageUrl = await getPageUrl(
      page,
      `//*[@id="frmDefault"]/div[3]/div/div[2]/div[1]/div/div[2]/div/div[4]/ul/li[${iterate}]/div/div/div[1]/a`
    )

    let type = km[3]
    let cc 
    let kms
    
    if(km[0]== undefined || km[1]== undefined){
      kms = '0'
    }else kms = km[0] + km[1]
    
    price = parseInt(price.replace(/\D/g, ''))
    if(Number.isInteger(price) == false) price = 0

    if(type === 'Electric' || km[4] == undefined ) {
      cc ='0'
    }else cc = km[4].replace(/\D/g, '')

    let transmission = km[2]
    return {
      vm_carimage: imgUrl,
      vm_carname: title.replace(/\s+/g, " ").trim(),
      vm_price: price,
      vm_km: parseInt(kms),
      vm_cc:  parseInt(cc),
      vm_type: type!=undefined?type:null,
      vm_transmission: transmission,
      vm_pageurl: pageUrl,
    }
  }


  async function getWholeSaleCarsPageData(page,iterate){
    let imgUrl = await getImgUrl(
        page,
        `//*[@id="frmDefault"]/div[3]/div/div[2]/div[2]/div/div[2]/div[3]/ul/li[${iterate}]/div/div[1]/div[3]/div/div/div[2]/div/a/img`
      )
      let title = await getTxtContent(
        page,
        `//*[@id="frmDefault"]/div[3]/div/div[2]/div[2]/div/div[2]/div[3]/ul/li[${iterate}]/div/div[2]/div[1]/a[2]`
      )
  
      let km = await getTxtContent(
        page,
        `//*[@id="frmDefault"]/div[3]/div/div[2]/div[2]/div/div[2]/div[3]/ul/li[${iterate}]/div/div[2]/div[3]/div/text()`
      )
  
      km = await km.replace(/\s+/g, " ").trim().split(",")
  
      let price = await getTxtContent(
        page,
        `//*[@id="frmDefault"]/div[3]/div/div[2]/div[2]/div/div[2]/div[3]/ul/li[${iterate}]/div/div[2]/span/span/span/span`
      )
      let pageUrl = await getPageUrl(
        page,
        `//*[@id="frmDefault"]/div[3]/div/div[2]/div[2]/div/div[2]/div[3]/ul/li[${iterate}]/div/div[1]/div[3]/div/div/div[2]/div/a`
      )
     
      let type = km[3]
      let cc 
      let kms 
      price = parseInt(price.replace(/\D/g, ''))
      if(Number.isInteger(price) == false) price = 0

    if(type === 'Electric' || km[4] == undefined ) {
      cc ='0'
    }else cc = km[4].replace(/\D/g, '')

    if(km[0]== undefined || km[1]== undefined){
      kms = '0'
    }else kms = km[0] + km[1]

      let transmission = km[2]
      return ({
        wc_carimage: imgUrl,
        wc_carname: title.replace(/\s+/g, " ").trim(),
        wc_price: price,
        wc_km: parseInt(kms),
        wc_cc:  parseInt(cc),
        wc_type: type!=undefined?type:null,
        wc_transmission: transmission,
        wc_pageurl: pageUrl,
      })
  }

  async function getTxtContent(page, xpath) {
    const [el1] = await page.$x(xpath)
    try{
        const title = await el1.getProperty("textContent")
        const rawTitle = await title.jsonValue()
        return await rawTitle
    }catch{
        return "N/A"
    }
  }
  async function getImgUrl(page, xpath) {
      const [el] = await page.$x(xpath)
    try{
        let src = await el.getProperty("src")
        const srcTxt = await src.jsonValue()
        return await srcTxt
    }catch(err){
         return "N/A"
    }
  }
  
  async function getPageUrl(page, xpath) {
    const [el] = await page.$x(xpath)
    try{
        const src = await el.getProperty("href")
        const srcTxt = await src.jsonValue()
        return await srcTxt
    }catch{
        return "N/A"
    }
  }

  
  module.exports={
    getWholeSaleCarsPageData,
    getValueMotrosPageData,
    getCoventryCarsPageData,
    getCheapCarsPageData,
    getAutoWorldPageData
  }