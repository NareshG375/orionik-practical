import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import prisma from "./config/database.js"
 
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

const appointments = [];

//get all appointment data
app.get("/", (req, res) => {
  return res.status(200).json({ message: " All Appointment", appointments });
});
//Book a appointment with queue
app.post("/api/book-appointment", (req, res) => {
  const { userId, dateTime, duration } = req.body;

  if (!userId || !dateTime || !duration)
    return res.status(400).json({ message: "All the fields are mandatory" });

  const requestedTime = new Date(dateTime); //2026-01-06T10:30:00.000Z

  const isAlreadyBook = appointments.some((appt) => appt.dateTime === dateTime);

  if (isAlreadyBook) {
    return res
      .status(400)
      .json({ message: " This time slot  is alraady booked" });
  }

  const addInque = appointments.filter(
    (apt) => new Date(apt.dateTime) < requestedTime
  ).length;

  const waitMins = addInque * duration;
  const appointment = {
    id: appointments.length + 1,
    userId,
    status: "check_in",
    dateTime,
    duration,
    estimateWaitMin: 0,
  };

  appointments.push(appointment);
  reCalWaitTime();

  return res.status(201).json({
    message: "Appointment booked is successfull",
    data: appointments,
  });
});

//delete the appointment and cancel appointment

app.delete("/api/cancel-appointment/:id", (req, res) => {
  const aptId = Number(req.params.id);

  const index = appointments.findIndex((apt) => apt.id === aptId);

  if (index === -1)
    return res.status(400).json({ mesaage: "Appointment is not found" });

  const cancelAppoint = appointments.splice(index, 1);

  reCalWaitTime();
  return res.status(200).json({
    message: "appointment canceled",
    cancelAppoint,
    updatedWaittime: appointments,
  });
});


//recalculate the waiting time
function reCalWaitTime() {
  appointments.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
  let totalWait = 0;

  appointments.forEach((appt) => {
    appt.estimateWaitMin = totalWait;
    totalWait += appt.duration;
  });
}


//get partition data by partition

app.get("/api/user/:partition", async (req, res) => {
  const partition = Number(req.params.partition);

  if (partition < 1 || partition > 30) {
    return res.status(400).json({ message: "invalid partition" });
  }

  try {
    const testData = await prisma[`user${partition}`].findMany();
    return res.status(200).json({ data: testData });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});


//get partition data by user_id(id)
app.get("/api/user/:id", async (req, res) => {
  try {
    const userId = Number(req.params.id);

    const partition = (userId % 3) + 1;

    const user = await prisma[`user${partition}`].findFirst({
      where: { id: userId }
    });

    res.status(200).json({ message: "data access", data: user });
  } catch (errors) {
    return res.status(500).json({ message: "server errorsddas", errors });
  }
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
