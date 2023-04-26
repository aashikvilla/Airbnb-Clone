'use client'
import { SafeUser } from '@/app/types';
import Container from '../Container'
import Logo from './Logo'
import Search from './Search';
import UserMenu from './UserMenu';
import {User} from '@prisma/client'
import Categories from './Categories';

interface NavbarProps {
  currentUser ?: SafeUser | null
}

function Navbar({currentUser}:NavbarProps) {
  console.log("user",currentUser)
  return (
    <div className="fixed w-full bg-white shadow-sm">
      <div className="py-4 border-p-[1px]"> 
        <Container>
          <div className="flex flex-row item-center justify-between gap-3 md gap-0">
            <Logo />
            <Search/>
            <UserMenu currentUser={currentUser}/>
          </div>
        </Container>
      </div>
      <Categories/>
    </div>
  );
}

export default Navbar;