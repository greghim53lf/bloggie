import { Button, Navbar, TextInput, Dropdown, Avatar } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import {useSelector} from 'react-redux'

export default function Header() {
  const path = useLocation().pathname
  const {currentUser} = useSelector(({user}) => user)
    
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-red-500 via-orange-400 to-rose-700 rounded-lg text-white">
          BLOGGIE
        </span>
      </Link>
      <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={IoIosSearch}
          className="hidden lg:inline"
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <IoIosSearch />
      </Button>
      <div className="flex gap-2 md:order-2">
        <Button className="w-12 h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar
              alt='user'
              img={currentUser.profilePicture}
              rounded />}
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username }</span>
              <span className='block text-sm font-medium truncate'>{currentUser.email }</span>
            </Dropdown.Header>
            <Link to='/dashboard?tab=profile'>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider/>
              <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        ): (
          <Link to="/sign-in">
            <Button outline gradientDuoTone="pinkToOrange">Sign In</Button>
                </Link>
        )}
              <Navbar.Toggle/>
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link  active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link  active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}