const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let cbgSchema = new Schema({
    area_name: String,
    collect_num: Number,
    desc_sumup_short: String,
    equip_level: Number,
    game_ordersn: String,
    highlights: Array,
    level_desc: String,
    price: Number,
    server_name: String,
    serverid: Number,
    storage_type: Number,
    format_equip_name: String,
});

module.exports = mongoose.model('Cbg', cbgSchema);