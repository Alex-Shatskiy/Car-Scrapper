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
  
    return await({
      aw_carimage: imgUrl,
      aw_carname: title.replace(/\s+/g, " ").trim(),
      aw_price: price !=undefined?parseInt(price.replace(/\D/g, '')):null,
      aw_km: parseInt(km[0] + km[1]),
      aw_cc: km[4] !=undefined?parseInt( km[4].replace(/\D/g, '')):null,
      aw_type: km[3]!=undefined?km[3]:null,
      aw_transmission: km[2],
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

  return await ({
   cc_carimage: imgUrl,
   cc_carname: title.replace(/\s+/g, " ").trim(),
   cc_price: price !=undefined?parseInt(price.replace(/\D/g, '')):null,
   cc_km: parseInt(km[0] + km[1]),
   cc_cc: km[4] !=undefined?parseInt( km[4].replace(/\D/g, '')):null,
   cc_type: km[3]!=undefined?km[3]:null,
   cc_transmission: km[2],
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
    return await {
      conc_carimage: imgUrl,
      conc_carname: title.replace(/\s+/g, " ").trim(),
      conc_price: price !=undefined?parseInt(price.replace(/\D/g, '')):null,
      conc_km: parseInt(km[0] + km[1]),
      conc_cc: km[4] !=undefined?parseInt( km[4].replace(/\D/g, '')):null,
      conc_type: km[3]!=undefined?km[3]:null,
      conc_transmission: km[2],
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
  
    return await {
        vm_carimage: imgUrl,
        vm_carname: title.replace(/\s+/g, " ").trim(),
        vm_price: price !=undefined?parseInt(price.replace(/\D/g, '')):null,
        vm_km: parseInt(km[0] + km[1]),
        vm_cc: km[4] !=undefined?parseInt( km[4].replace(/\D/g, '')):null,
        vm_type: km[3]!=undefined?km[3]:null,
        vm_transmission: km[2],
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
  
    
      return await ({
        ws_carimage: imgUrl,
        ws_carname: title.replace(/\s+/g, " ").trim(),
        ws_price: price !=undefined?parseInt(price.replace(/\D/g, '')):null,
        ws_km: parseInt(km[0] + km[1]),
        ws_cc: km[4] !=undefined?parseInt( km[4].replace(/\D/g, '')):null,
        ws_type: km[3]!=undefined?km[3]:null,
        ws_transmission: km[2],
        ws_pageurl: pageUrl,
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