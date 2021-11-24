const generateBtn = document.getElementById("start")
const environment = document.getElementById("environment")
const excelSelector = document.getElementById("for-excel")
const inputArea = document.getElementById("rawData")
const outputArea = document.getElementById("output")
const copyBtn = document.getElementById("copy")

generateBtn.addEventListener("click", function () {
  let selectedEnvironment = environment.value
  let rawData = inputArea.value
  if (excelSelector.checked) {
    outputArea.value = generateExcelListFromUi(rawData)
  } else {
    if (selectedEnvironment === "") {
      alert("You have to select environment")
    }
    if (selectedEnvironment === "ui") {
      outputArea.value = generateFromUi(rawData)
    }
    if (selectedEnvironment === "excel") {
      outputArea.value = generateFromExcel(rawData)
    }
  }
})

excelSelector.addEventListener("change", () => {
  if (excelSelector.checked) {
    console.log("I am checked!")
    environment.disabled = true
    environment.style.cursor = "not-allowed"
  } else {
    console.log("Not checked!")
    environment.disabled = false
    environment.style.cursor = "pointer"
  }
})

copyBtn.addEventListener("click", () => {
  outputArea.select()
  document.execCommand("copy")
})

const generateFromUi = (data) => {
  const companies = data.split("No\n")
  var numberOfCompanies = companies.length
  var i, company
  var rawTaxCodes = []
  var taxCodes = "["
  if (!data.replace(/\s/g, "").length) {
    taxCodes = "You have entered no data inside input text area"
    return taxCodes
  }
  for (i = 0; i < numberOfCompanies; i++) {
    company = companies[i].split(/\r?\n/)
    rawTaxCodes.push(company[0].trim())
  }
  for (i = 0; i < rawTaxCodes.length; i++) {
    if (rawTaxCodes[i] === "") {
      if (i === rawTaxCodes.length - 1) {
        taxCodes = taxCodes.slice(0, -1) //this removes last char from string variable taxCodes
        taxCodes = taxCodes + "]"
        continue
      }
      continue
    }

    if (i === rawTaxCodes.length - 1) {
      taxCodes = taxCodes + '"' + rawTaxCodes[i] + '"]'
      continue
    }

    taxCodes = taxCodes + '"' + rawTaxCodes[i] + '",'
  }
  return taxCodes
}

const generateFromExcel = (data) => {
  var companies = data.split("\n")
  var numberOfCompanies = companies.length
  var i, finalTaxCodes
  var taxCodes = "["
  if (!data.replace(/\s/g, "").length) {
    finalTaxCodes = "You have entered no data inside input text area"
    return finalTaxCodes
  }
  for (i = 0; i < numberOfCompanies; i++) {
    if (i === numberOfCompanies - 1) {
      if (companies[i] === "") {
        finalTaxCodes = taxCodes.slice(0, -1)
        finalTaxCodes = finalTaxCodes + "]"
        continue
      } else {
        finalTaxCodes = taxCodes + '"' + companies[i] + '"]'
        continue
      }
    } else if (companies[i] === "" || companies[i].includes(" ")) {
      continue
    }
    taxCodes = taxCodes + '"' + companies[i] + '",'
  }
  return finalTaxCodes
}

const generateExcelListFromUi = (data) => {
  const companies = data.split("No\n")
  var numberOfCompanies = companies.length
  var i, company
  var rawTaxCodes = []
  var taxCodes = "'"
  if (!data.replace(/\s/g, "").length) {
    taxCodes = "You have entered no data inside input text area"
    return taxCodes
  }
  //Generation of tax codes JS array
  for (i = 0; i < numberOfCompanies; i++) {
    company = companies[i].split(/\r?\n/)
    rawTaxCodes.push(company[0].trim())
  }

  for (i = 0; i < rawTaxCodes.length; i++) {
    if (rawTaxCodes[i] === "") {
      if (i === rawTaxCodes.length - 1) {
        taxCodes = taxCodes.slice(0, -2) //this removes last 2 chars from string variable taxCodes
        taxCodes = taxCodes
        continue
      }
      continue
    }
    if (i === rawTaxCodes.length - 1) {
      taxCodes = taxCodes + rawTaxCodes[i]
      continue
    }

    taxCodes = taxCodes + rawTaxCodes[i] + "\n'"
  }

  return taxCodes
}
