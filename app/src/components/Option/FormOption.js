import stations from "./MRT";

const PriceOpt = [
    {key: "Below 200", value: "Below 200", text: "Below 200"},
    {key: "200 ~ 500", value: "200 ~ 500", text: "200 ~ 500"},
    {key: "500 ~ 1000", value: "500 ~ 1000", text: "500 ~ 1000"},
    {key: "Above 1000", value: "Above 1000", text: "Above 1000"}
]
const TypeOpt = [
    {key: "中式", value: "中式", text: "中式"},
    {key: "台式", value: "台式", text: "台式"},
    {key: "日式", value: "日式", text: "日式"},
    {key: "西式", value: "西式", text: "西式"}
]
const ReasonOpt = [
    {key: "約會", value: "約會", text: "約會"},
    {key: "生日", value: "生日", text: "生日"},
    {key: "聚會", value: "聚會", text: "聚會"},
    {key: "公事", value: "公事", text: "公事"}
]
const HWPOpt = [
    {key: "1-2", value: "1-2", text: "1-2"},
    {key: "3-4", value: "3-4", text: "3-4"},
    {key: "5+", value: "5+", text: "5+"}
]
const LineOpt = [
    {key: "文湖線", value: "文湖線", text: "文湖線"},
    {key: "淡水信義線", value: "淡水信義線", text: "淡水信義線"},
    {key: "松山新店線", value: "松山新店線", text: "松山新店線"},
    {key: "中和新蘆線", value: "中和新蘆線", text: "中和新蘆線"},
    {key: "板南線", value: "板南線", text: "板南線"},
]
let StationOpt = {
    "文湖線": [],
    "淡水信義線": [],
    "松山新店線": [],
    "中和新蘆線": [],
    "板南線": []
}

for (let [key, value] of Object.entries(stations)) {
    for (let station of value) {
        StationOpt[key].push({key: station.name, value: station.name, text: station.name});
    }
}

export {PriceOpt, TypeOpt, ReasonOpt, HWPOpt, LineOpt, StationOpt}