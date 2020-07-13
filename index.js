const mongoose = require('mongoose')
const Schema = mongoose.Schema;

mongoose
  .connect("mongodb://localhost/myDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// // Create Schema
// const UserSchema = new Schema({
//   alias: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });

// const User = mongoose.model("myUsers", UserSchema);

// const newUser = new User({
//   alias: "TestAlias",
//   email: "alias@test.com",
//   password: "plainText"
// })

// newUser.save().then(user => console.log(JSON.stringify(user))).catch(err => console.log(err))

// User.findOne({ alias: "TestAlias"}).then(user => console.log(user)).catch(err => console.log(err));


const InitiativeSchema  = new mongoose.Schema({
  name: String,
  dateRange: Object, 
  updateFrequency: String,
  priority: String,
  status: String,
})
var Program  = mongoose.model('program', new mongoose.Schema({
  name: String,
  programManagerId: String,
  color: String,
  initiatives: [InitiativeSchema],
}))


// var programData  = {
//   "programs":[
//       {
//           "programId":"abcdef",
//           "color":"red",
//           "name": "marketing",
//           "initiatives": [
//               {
//                   "name": "marketing",
//                   "dateRange": {
//                       "from": "",
//                       "to": ""
//                   },
//                   "updateFrequency": 2,
//                   "priority": "high",
//                   "status": "on track"
//               }
//           ]
//       }
//   ]
// }


// programData.programs.forEach((program)=>{
//   const newProgram = new Program()
//     newProgram.initiatives =  program.initiatives
//     newProgram.save(newProgram)
//     .then(res => console.log('inserterd program'))
//     .catch(err => console.log(err))
// })


// insert program
// Program.insertMany(programData.programs)
// .then(resM => console.log(resM))
// .catch()


// insert initiatives

const initiativeData  = {
  programId: "5f0c2342fa3c07328012c11a",
  "initiatives": [
    {
        "name": " sales",
        "dateRange": {
            "from": "",
            "to": ""
        },
        "updateFrequency": 2,
        "priority": "high",
        "status": "on track"
    },
    {
      "name": "HR",
      "dateRange": {
          "from": "",
          "to": ""
      },
      "updateFrequency": 2,
      "priority": "high",
      "status": "on track"
  }
]
}

Program.updateOne(
  {_id: initiativeData.programId} ,
  { $push: {initiatives: {
      $each: initiativeData.initiatives
    }
  }})
  .then(res2=> console.log(res2))

