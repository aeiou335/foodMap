import Restaurant from "../models/Restaurant";

const fakeData = [
    {
        Name: "鼎泰豐",
        Price: "200 ~ 500",
        Station: ["中山", "東門", "臺北101/世貿"],
        Type: "中式",
        HowManyPeople: ["1-2", "3-4", "5+"],
        Reason: ["聚會"],
        Rating: 10
    },
    {
        Name: "辛殿",
        Price: "500 ~ 1000",
        Station: ["松江南京"],
        Type: "中式",
        HowManyPeople: ["3-4", "5+"],
        Reason: ["聚會", "公事"],
        Rating: 6
    },
    {
        Name: "大戶屋",
        Price: "200 ~ 500",
        Station: ["大坪林"],
        Type: "日式",
        HowManyPeople: ["1-2", "3-4"],
        Reason: ["約會", "生日", "聚會", "公事"],
        Rating: 5
    },
    {
        Name: "金鋒滷肉飯",
        Price: "Below 200",
        Station: ["中正紀念堂"],
        Type: "台式",
        HowManyPeople: ["1-2", "3-4"],
        Reason: ["聚會"],
        Rating: 7
    },
    {
        Name: "路邊烤肉",
        Price: "200 ~ 500",
        Station: ["民權西路", "大安"],
        Type: "台式",
        HowManyPeople: ["1-2", "3-4", "5+"],
        Reason: ["約會", "生日", "聚會", "公事"],
        Rating: 7
    },
    {
        Name: "山嵐拉麵",
        Price: "200 ~ 500",
        Station: ["公館", "大安"],
        Type: "日式",
        HowManyPeople: ["1-2"],
        Reason: ["約會", "公事"],
        Rating: 8
    },
    {
        Name: "教父牛排",
        Price: "Above 1000",
        Station: ["劍南路", "大直"],
        Type: "西式",
        HowManyPeople: ["1-2", "3-4"],
        Reason: ["約會", "生日", "聚會"],
        Rating: 4
    },
    {
        Name: "阿財鍋貼",
        Price: "Below 200",
        Station: ["石牌"],
        Type: "台式",
        HowManyPeople: ["1-2", "3-4"],
        Reason: ["聚會", "公事"],
        Rating: 8
    },
    {
        Name: "牛洞食堂",
        Price: "Below 200",
        Station: ["公館", "台電大樓"],
        Type: "日式",
        HowManyPeople: ["1-2", "3-4"],
        Reason: ["約會", "生日", "聚會", "公事"],
        Rating: 7
    },
    {
        Name: "漁兵衛",
        Price: "200 ~ 500",
        Station: ["中山"],
        Type: "日式",
        HowManyPeople: ["1-2", "3-4"],
        Reason: ["約會", "聚會", "公事"],
        Rating: 6
    },
    {
        Name: "Old Seat",
        Price: "500 ~ 1000",
        Station: ["忠孝復興", "忠孝敦化"],
        Type: "中式",
        HowManyPeople: ["3-4", "5+"],
        Reason: ["約會", "生日", "聚會", "公事"],
        Rating: 9
    },
    {
        Name: "起上小法師",
        Price: "500 ~ 1000",
        Station: ["忠孝復興", "忠孝敦化"],
        Type: "日式",
        HowManyPeople: ["1-2", "3-4", "5+"],
        Reason: ["約會", "生日", "聚會"],
        Rating: 8
    }
]

const checkDB = async () => {
    const checkRes = await Restaurant.find();
    if (checkRes.length === 0) {
        fakeData.forEach( async (res) => {
            const info = {
                Name: res.Name,
                Price: res.Price,
                Station: res.Station,
                Type: res.Type,
                HowManyPeople: res.HowManyPeople,
                Reason: res.Reason,
                OfficialRating: res.Rating
            }
            const newRes = new Restaurant (info);
            await newRes.save();
            console.log("Fake data has saved.")
        })
    }
}

export default checkDB;