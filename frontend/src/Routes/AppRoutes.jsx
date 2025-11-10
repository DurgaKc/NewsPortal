import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "../Layout/UserLayout";
import Main from "../Pages/UserPages/Home/Main";
import News from "../Pages/UserPages/News";
import International from "../Pages/UserPages/International";
import Politics from "../Pages/UserPages/Politics";
import LocalGovernment from "../Pages/UserPages/LocalGovernment";
import Sports from "../Pages/UserPages/Sports";
import Province from "../Pages/UserPages/Province"
import Interview from "../Pages/UserPages/Interview";
import Entertainment from "../Pages/UserPages/Entertainment";
import Education from "../Pages/UserPages/Education";
import Blog from "../Pages/UserPages/Blog";
import Health from "../Pages/UserPages/Health";
import Literature from "../Pages/UserPages/Literature";
import Lifestyle from "../Pages/UserPages/Lifestyle";
import Login from "../Pages/UserPages/Login";
import AdminLayout from "../Layout/AdminLayout";
import Home from "../Pages/AdminPages/Home";
import AddInternational from "../Pages/AdminPages/International/AddInternational";
import InternationalList from "../Pages/AdminPages/International/International";
import PasswordChange from "../Components/Admin/PasswordChange";
import UserProfile from "../Components/Admin/UserProfile";
import InternationalDetail from "../Pages/AdminPages/International/InternationalDetail";
import ViewPolitics from "../Pages/AdminPages/Politics/ViewPolitics";
import AddPoliticsNews from "../Pages/AdminPages/Politics/AddPolitics";
import ViewLocalGovernment from "../Pages/AdminPages/LocalGovernment/ViewLocalGovernment";
import AddLocalGovernment from "../Pages/AdminPages/LocalGovernment/AddLocalGovernment";
import ViewHealth from "../Pages/AdminPages/Health/ViewHealth";
import AddHealthNews from "../Pages/AdminPages/Health/AddHealth";
import ViewEducation from "../Pages/AdminPages/Education/ViewEducation";
import AddEducationNews from "../Pages/AdminPages/Education/AddEducation";
import ViewSports from "../Pages/AdminPages/Sports/ViewSports";
import AddSportsNews from "../Pages/AdminPages/Sports/AddSports";
import ViewInterview from "../Pages/AdminPages/Interview/ViewInterview";
import AddInterview from "../Pages/AdminPages/Interview/AddInterview";
import ViewBlog from "../Pages/AdminPages/Blog/ViewBlog";
import AddBlog from "../Pages/AdminPages/Blog/AddBlog";
import ViewProvince from "../Pages/AdminPages/Province/ViewProvince";
import AddProvince from "../Pages/AdminPages/Province/AddProvince";
import ViewEntertainment from "../Pages/AdminPages/Entertainment/ViewEntertainment";
import AddEntertainment from "../Pages/AdminPages/Entertainment/AddEntertainment";
import ViewLifestyle from "../Pages/AdminPages/Lifestyle/ViewLifestyle";
import AddLifestyle from "../Pages/AdminPages/Lifestyle/AddLifestyle";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Main />} />
          <Route path="/news" element={<News />} />
          <Route path="/international" element={<International />} />
          <Route path="/politics" element={<Politics />} />
          <Route path="/local-government" element={<LocalGovernment />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/province" element={<Province />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/education" element={<Education />} />
          <Route path="/health" element={<Health />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/literature" element={<Literature />} />
          <Route path="/lifestyle" element={<Lifestyle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/international/:id" element={<InternationalDetail />} />

        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Home />} />
          {/* Admin */}
        <Route path='password-change' element={<PasswordChange/>}/>
        <Route path='user-profile' element={<UserProfile/>}/>

          {/* international */}
          <Route path="interlist" element={<InternationalList/>}/>
          <Route path='/admin/interlist/add' element={<AddInternational/>}/>
          {/* Politics */}
          <Route path="politics" element={<ViewPolitics/>}/>
          <Route path="/admin/politics/addpolitics" element={<AddPoliticsNews/>}/>
          {/* local government */}
          <Route path="local-government" element={<ViewLocalGovernment/>}/>
          <Route path="/admin/local-government/add" element={<AddLocalGovernment/>}/>
          {/* health */}
          <Route path="health" element={<ViewHealth/>}/>
          <Route path="/admin/health/addhealthnews" element={<AddHealthNews/>}/>
          {/* Education */}
          <Route path="education" element={<ViewEducation/>}/>
          <Route path="/admin/education/addeducationnews" element={<AddEducationNews/>}/>
          {/* Sports */}
          <Route path="sports" element={<ViewSports/>}/>
          <Route path="/admin/sports/addsports"  element={<AddSportsNews/>}/>
          {/* Province */}
          <Route path="province" element={<ViewProvince/>}/>
          <Route path="/admin/province/addprovince"  element={<AddProvince/>}/>
          {/* entertainment */}
          <Route path="entertainment" element={<ViewEntertainment/>}/>
          <Route path="/admin/entertainment/addentertainment"  element={<AddEntertainment/>}/>
          {/* interview */}
          <Route path="interview" element={<ViewInterview/>}/>
          <Route path="/admin/interview/addinterview" element={<AddInterview/>}/>
          {/* blog */}
          <Route path="blog" element={<ViewBlog/>}/>
          <Route path="/admin/blog/addblog" element={<AddBlog/>}/>
          {/* lifestyle */}
          <Route path="lifestyle" element={<ViewLifestyle/>}/>
          <Route path="/admin/lifestyle/addlifestyle" element={<AddLifestyle/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
