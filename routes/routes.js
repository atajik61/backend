import express from "express";
import { getProverbs, saveProverbs } from "../utils/filehelper.js";

const router = express.Router();

export default () => {
  //get
  router.get("/", (req, res) => {
    const proverbs = getProverbs();
    res.json({ proverbs });
  });
  //post
  const proverbsData = getProverbs();
  router.post("/proverbs", (req, res) => {
    const newTask = req.body;
    const newTaskId = proverbsData.length + 1;
    newTask.id = newTaskId;
    proverbsData.push(newTask);
    saveProverbs(proverbsData);
    res.send("task created succesfully");
  });
  //Update
  router.put("/proverbs/:id", (req, res) => {
    const id = parseInt(req.params.id, 10); // تبدیل id به عدد
    let proverbs = getProverbs(); // دریافت لیست پروبرب‌ها
    const index = proverbs.findIndex((proverb) => proverb.id === id); // جستجوی پروبرب با id مشخص

    // بررسی وجود پروبرب
    if (index === -1) {
      return res.status(404).json({ message: "Proverb not found" });
    }

    // ایجاد پروبرب به‌روز شده
    const updatedProverb = {
      id: id,
      textDari: req.body.textDari,
      translationEn: req.body.translationEn,
      category: req.body.category,
    };

    proverbs[index] = updatedProverb; // به‌روزرسانی پروبرب در آرایه

    try {
      console.log("Saving proverbs:", proverbs); // لاگ‌گذاری پروبرب‌ها
      saveProverbs(proverbs); // ذخیره‌سازی پروبرب‌ها
      res.json({
        message: "Proverb updated successfully",
        proverb: updatedProverb,
      });
    } catch (error) {
      console.error("Error saving proverbs:", error);
      res.status(500).json({ message: "Error saving proverbs." });
    }
  });
  //Delete
  router.delete("/proverbs/:id", (req, res) => {
    const id = parseInt(req.params.id, 10); // تبدیل id به عدد
    let proverbs = getProverbs();
    const initialLength = proverbs.length;

    // فیلتر کردن پروبرب‌ها
    proverbs = proverbs.filter((proverb) => proverb.id !== id);

    // بررسی اینکه آیا پروبربی حذف شده است
    if (proverbs.length === initialLength) {
      return res.status(404).json({ message: "Proverb not found" });
    }

    try {
      saveProverbs(proverbs); // ذخیره‌سازی پروبرب‌های جدید
      res.json({ message: "Proverb deleted successfully" });
    } catch (error) {
      console.error("Error saving proverbs:", error);
      res.status(500).json({ message: "Error deleting proverb." });
    }
  });
  return router;
};
