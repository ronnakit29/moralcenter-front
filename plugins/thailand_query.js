import province from "./thai_provinces.json"
import district from "./thai_amphures.json"
export function getAllProvince() {
    return province["RECORDS"]
}
export function getProvinceByName(name) {
    return province["RECORDS"].filter(province => province.name_th === name)
}
export function getDistrictByProvince(province_name) {
    const findByProvinceName = getProvinceByName(province_name)
    if (findByProvinceName.length > 0) {
        return district["RECORDS"].filter(district => district.province_id === findByProvinceName[0].id)
    }
    return []
}