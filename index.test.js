const { TestScheduler } = require("jest")
const index = require("./index")

test("London should return false", ()=> {
    expect(index.isPostalCode("London")).toBe(false)
})

test("San Fransisco should return false", ()=> {
    expect(index.isPostalCode("San Fransisco")).toBe(false)
})

test("AS444 should return true", ()=> {
    expect(index.isPostalCode("Lond4on")).toBe(true)
})

test("4444 should return true", ()=> {
    expect(index.isPostalCode("4444")).toBe(true)
})