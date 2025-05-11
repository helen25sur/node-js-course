const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db('university');
    const students = db.collection('students');

    console.log('\n=== 1. Очищення колекції перед стартом ===');
    await students.deleteMany({});

    console.log('\n=== 2. Додавання студентів ===');
    await students.insertMany([
      { name: "Ivan", age: 21, group: "A-31", marks: [75, 90, 82] },
      { name: "Anna", age: 22, group: "B-22", marks: [88, 92, 85] },
      { name: "Alex", age: 20, group: "A-31", marks: [65, 70, 72] },
      { name: "Maria", age: 23, group: "C-10", marks: [95, 89, 90] },
      { name: "Dmytro", age: 19, group: "B-22", marks: [78, 82, 80] }
    ]);

    console.log('\n=== 3. Всі студенти ===');
    console.log(await students.find().toArray());

    console.log('\n=== 4. Оновлення віку Івана ===');
    await students.updateOne({ name: "Ivan" }, { $set: { age: 22 } });

    console.log('\n=== 5. Видалення одного студента з групи A-31 ===');
    await students.deleteOne({ group: "A-31" });

    console.log('\n=== 6. Студенти старші 20 ===');
    console.log(await students.find({ age: { $gt: 20 } }).toArray());

    console.log('\n=== 7. Студенти з оцінкою > 85 ===');
    console.log(await students.find({ marks: { $elemMatch: { $gt: 85 } } }).toArray());

    console.log('\n=== 8. Імена на "A" ===');
    console.log(await students.find({ name: { $regex: /^A/ } }).toArray());

    console.log('\n=== 9. Сортування за віком (спадання) ===');
    console.log(await students.find().sort({ age: -1 }).toArray());

    console.log('\n=== 10. Середній бал кожного студента ===');
    const avgMarks = await students.aggregate([
      {
        $project: {
          name: 1,
          averageMark: { $avg: "$marks" }
        }
      }
    ]).toArray();
    console.log(avgMarks);

    console.log('\n=== 11. Групування за групою ===');
    const grouped = await students.aggregate([
      {
        $group: {
          _id: "$group",
          count: { $sum: 1 }
        }
      }
    ]).toArray();
    console.log(grouped);

    console.log('\n=== 12. Загальна середня оцінка ===');
    const totalAvg = await students.aggregate([
      { $unwind: "$marks" },
      {
        $group: {
          _id: null,
          totalAvg: { $avg: "$marks" }
        }
      }
    ]).toArray();
    console.log(totalAvg);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

run();
