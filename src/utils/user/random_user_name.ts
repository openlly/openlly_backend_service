
export const generateRandomUserName = () => {
    var usernames=
        [
            "ShadowChaser",
            "BlazeRunner",
            "MysticVortex",
            "EchoFalcon",
            "NeonPioneer",
            "CyberNomad",
            "VelvetThunder",
            "QuantumLeap",
            "PixelSamurai",
            "SolarFlareX",
            "LunarLegend",
            "StormWhisper",
            "FrostByte",
            "InfernoKnight",
            "AquaPhantom",
            "TurboTiger",
            "SonicBoomer",
            "CrimsonSpectre",
            "ElectricVibe",
            "PhantomDancer",
            "GalaxyRider",
            "StealthPanther",
            "NeonNinja",
            "BlizzardWolf",
            "IronCladWarrior",
            "CobaltCrusader",
            "VortexVoyager",
            "RapidRaven",
            "SolarSphinx",
            "ThunderBoltZ",
            "EmeraldEnigma",
            "ShadowProwler",
            "NovaKnight",
            "ZenithZephyr",
            "WarpedWanderer",
            "ObsidianOwl",
            "TitanTornado",
            "SapphireStorm",
            "VelocityViper",
            "CrimsonComet",
            "BlazingPhoenix",
            "SilverSurge",
            "DarkMatterX",
            "AuroraAssassin",
            "StealthyCheetah",
            "MeteorMaverick",
            "CyberneticWolf",
            "IronShadow",
            "NebulaNomad",
            "StormBreaker",
            "RadiantRogue",
            "ElectricEagle",
            "ShadowSphinx",
            "FrostFlame",
            "QuantumQuasar"
        ]
    return usernames[Math.floor(Math.random() * usernames.length)];
}

export const generateRandomUserProfileImage = () => {
    var profileImages=[
        "https://res.cloudinary.com/dbub0bybi/image/upload/v1743859949/avatar_assets/image_104_mocbyh.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859950/avatar_assets/image_119_qqkgqz.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859949/avatar_assets/image_90_jf1tpt.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859948/avatar_assets/image_89_mrm23j.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859949/avatar_assets/image_101_f266j6.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859948/avatar_assets/image_60_azeyqd.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859948/avatar_assets/image_61_dcwpje.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859947/avatar_assets/image_59_ymcz6d.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859947/avatar_assets/image_57_vjybse.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859947/avatar_assets/image_56_aomup7.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859946/avatar_assets/image_54_iro6u5.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859946/avatar_assets/image_46_zctcd6.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859946/avatar_assets/image_42_esf6y1.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859945/avatar_assets/image_39_bmttej.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859945/avatar_assets/image_41_mgqzzt.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859945/avatar_assets/image_37_tjazd7.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859945/avatar_assets/image_33_fotgic.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859945/avatar_assets/image_34_vznwc4.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859944/avatar_assets/image_31_i7r2wh.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859944/avatar_assets/image_32_cfqdmf.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859944/avatar_assets/image_30_lezpji.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859944/avatar_assets/image_25_dnokkm.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859944/avatar_assets/image_23_lgzxe5.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859944/avatar_assets/image_8_bbwlrg.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859943/avatar_assets/image_5_h4rbgd.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859943/avatar_assets/image_9_dqznrf.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859943/avatar_assets/image_17_rdxk35.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859943/avatar_assets/image_4_cu7yhl.png",
"https://res.cloudinary.com/dbub0bybi/image/upload/v1743859943/avatar_assets/image_3_zw1e08.png",
        "https://res.cloudinary.com/dbub0bybi/image/upload/v1743859943/avatar_assets/image_2_uz6dpi.png"
    ]
    return profileImages[Math.floor(Math.random() * profileImages.length)]; 
}

export const generateRandomUserBackgroundColor = () => {
    var backgroundColors = [
        "#000000", // Black
        "#111111", // Very dark gray
        "#222222", // Dark gray
        "#FF5733", // Vibrant Orange
        "#33FF57", // Bright Green
        "#3357FF", // Vivid Blue
        "#FF33A1", // Hot Pink
        "#FFD700", // Gold
        "#00FFFF", // Aqua
        "#FF4500", // Orange Red
        "#8A2BE2", // Blue Violet
        "#7FFF00", // Chartreuse
        "#DC143C", // Crimson
        "#00CED1", // Dark Turquoise
        "#FF1493", // Deep Pink
        "#1E90FF", // Dodger Blue
        "#ADFF2F", // Green Yellow
        "#FF69B4", // Hot Pink
        "#CD5C5C", // Indian Red
        "#4B0082", // Indigo
        "#FFFFF0", // Ivory
        "#F0E68C", // Khaki
        "#E6E6FA", // Lavender
        "#FFF0F5", // Lavender Blush
        "#7CFC00", // Lawn Green
        "#FFFACD", // Lemon Chiffon
        "#ADD8E6", // Light Blue
        "#F08080", // Light Coral
        "#E0FFFF", // Light Cyan
        "#FAFAD2", // Light Goldenrod Yellow
        "#D3D3D3", // Light Gray
        "#90EE90", // Light Green
        "#FFB6C1", // Light Pink
        "#FFA07A", // Light Salmon
        "#20B2AA", // Light Sea Green
        "#87CEFA", // Light Sky Blue
        "#778899", // Light Slate Gray
        "#B0C4DE", // Light Steel Blue
        "#FFFFE0", // Light Yellow
        "#00FF00", // Lime
        "#32CD32", // Lime Green
        "#FAF0E6", // Linen
        "#FF00FF", // Magenta
        "#800000", // Maroon
        "#66CDAA", // Medium Aquamarine
        "#0000CD", // Medium Blue
        "#BA55D3", // Medium Orchid
        "#9370DB", // Medium Purple
        "#3CB371", // Medium Sea Green
        "#7B68EE", // Medium Slate Blue
        "#00FA9A", // Medium Spring Green
        "#48D1CC", // Medium Turquoise
        "#C71585", // Medium Violet Red
        "#191970", // Midnight Blue
        "#F5FFFA", // Mint Cream
        "#FFE4E1", // Misty Rose
        "#FFE4B5", // Moccasin
        "#FFDEAD", // Navajo White
        "#000080", // Navy
        "#FDF5E6", // Old Lace
        "#808000", // Olive
        "#6B8E23", // Olive Drab
        "#FFA500", // Orange
        "#FF4500", // Orange Red
        "#DA70D6", // Orchid
        "#EEE8AA", // Pale Goldenrod
        "#98FB98", // Pale Green
        "#AFEEEE", // Pale Turquoise
        "#DB7093", // Pale Violet Red
        "#FFEFD5", // Papaya Whip
        "#FFDAB9", // Peach Puff
        "#CD853F", // Peru
        "#FFC0CB", // Pink
        "#DDA0DD", // Plum
        "#B0E0E6", // Powder Blue
        "#800080", // Purple
        "#663399", // Rebecca Purple
        "#FF0000", // Red
        "#BC8F8F", // Rosy Brown
        "#4169E1", // Royal Blue
        "#8B4513", // Saddle Brown
        "#FA8072", // Salmon
        "#F4A460", // Sandy Brown
        "#2E8B57", // Sea Green
        "#FFF5EE", // Seashell
        "#A0522D", // Sienna
        "#C0C0C0", // Silver
        "#87CEEB", // Sky Blue
        "#6A5ACD", // Slate Blue
        "#708090", // Slate Gray
        "#FFFAFA", // Snow
        "#00FF7F", // Spring Green
        "#4682B4", // Steel Blue
        "#D2B48C", // Tan
        "#008080", // Teal
        "#D8BFD8", // Thistle
        "#FF6347", // Tomato
        "#40E0D0", // Turquoise
        "#EE82EE", // Violet
        "#F5DEB3", // Wheat
        "#FFFFFF", // White
        "#F5F5F5", // White Smoke
        "#FFFF00", // Yellow
        "#9ACD32"  // Yellow Green
      ];
    return backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
}