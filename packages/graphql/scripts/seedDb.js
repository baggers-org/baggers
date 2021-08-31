const mongoose = require("mongoose");

mongoose.connect(process.env.ATLAS_CLUSTER_URI)