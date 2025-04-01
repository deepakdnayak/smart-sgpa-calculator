# 📊 SGPA Calculator

An interactive and AI-powered **SGPA Calculator** that extracts subject scores from report card images and computes your Semester Grade Point Average (SGPA) dynamically.

## 🚀 Features
- 📷 **Image Upload**: Drag & drop, click to upload, or paste an image of your report card.
- 🎯 **AI-Powered OCR**: Uses Google's Gemini API to extract subject names, codes, and total marks from the image.
- 🔢 **Automatic Credit Assignment**: Dynamically fetches course credits from an online dataset.
- 📉 **SGPA Calculation**: Computes SGPA using the extracted marks and corresponding credits.
- 🎨 **Interactive UI**: Built using **React** and **Tailwind CSS** for a seamless experience.
- 🔔 **Toasts & Notifications**: User-friendly feedback using `sonner`.

## 🏗️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/sgpa-calculator.git
cd sgpa-calculator
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env.local` file and add your Google Gemini API key:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4️⃣ Run the Application
```bash
npm run dev
```
The app will be available at **http://localhost:3000**.

## 📝 Usage Guide
1. **Upload Image**: Drag & drop or select an image containing your subject marks.
2. **Processing**: The app extracts text using AI and matches subjects with credits.
3. **SGPA Calculation**: The system computes SGPA based on marks and corresponding credits.
4. **Results**: The final SGPA and extracted subject details are displayed interactively.

## 📚 How SGPA is Calculated
SGPA is calculated using:

SGPA = ( Σ (Grade Point × Credits) ) / ( Σ Credits )


### Grade Point Mapping:
| Marks Range | Grade Point |
|------------|------------|
| 90-100     | 10         |
| 80-89      | 9          |
| 70-79      | 8          |
| 60-69      | 7          |
| 50-59      | 6          |
| 45-49      | 5          |
| 40-44      | 4          |
| <40        | 0          |

## 🛠️ Technologies Used
- **Frontend**: React, Tailwind CSS
- **AI Model**: Google Gemini API
- **State Management**: useState, useEffect
- **Notifications**: `sonner`

## 💡 Contributing
Contributions are welcome! Follow these steps:
1. **Fork** the repository.
2. Create a **new branch**: `git checkout -b feature-branch`
3. Make your changes and **commit**: `git commit -m "Added new feature"`
4. **Push** to your fork: `git push origin feature-branch`
5. Open a **Pull Request** 🎉

## 🔗 Useful Links
- **Live Demo**: [Smart SGPA Calculator](https://smart-sgpa-calculator.vercel.app/)
- **Report Issues**: [GitHub Issues](https://github.com/yourusername/sgpa-calculator/issues)
- **Course Credits Dataset**: [GitHub Raw Data](https://raw.githubusercontent.com/deepakdnayak/datasets/refs/heads/main/courseCredits)

<!-- ## 📜 License
This project is licensed under the [MIT License](LICENSE). -->

---
🚀 **Happy Calculating!**

