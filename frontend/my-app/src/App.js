import StudentForm from "./StudentForm";
import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom' 
import StudentLogin from "./StudentLogin";
import StudentTable from "./StudentTable.js";
import TeacherForm from "./TeacherForm.js";
import TeacherLogin from "./TeacherLogin.js";
import TeacherTable from "./TeacherTable.js";
import ProductForm from "./productForm.js";
import Carousels from "./carousel.js";
import CarouselForm from "./carouselForm.js";
import CarouselGet from "./CarouselGet.js";


function App() {
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<StudentForm ></StudentForm>}></Route>
          <Route path="/stulogin" element={<StudentLogin />}></Route>
          <Route path="/stutable" element={<StudentTable />}></Route>
          <Route path="/teacher" element={<TeacherForm />}></Route>
          <Route path="/tealogin" element={<TeacherLogin />}></Route>
          <Route path="/teatable" element={<TeacherTable />}></Route>
          <Route path="/product" element={<ProductForm />}></Route>
          <Route path="/carousel/:id" element={<Carousels />}></Route>
          <Route path="/carouselform" element={<CarouselForm />}></Route>
          <Route path="/carouselimg" element={<CarouselGet />}></Route>
        </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;