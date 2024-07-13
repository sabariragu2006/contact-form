import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";


import { useEffect, useState } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from './config/firebase';
import Contactcard from "./components/Contactcard";
import Modal from "./components/Modal";

const App = () => {
  const [contacts, setContacts] = useState([]);

  const [isOpen,setOpen]= useState(false);

  const onOpen =()=>{
    setOpen(true);
  }

  const onClose =()=>{
    setOpen(false  );
  }

  useEffect(() => {
    const getContacts = async () => {
      try {
        console.log("Fetching contacts...");
        const contactRef = collection(db, "contacts");
        const contactSnap = await getDocs(contactRef);
        const contactList = contactSnap.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactList);
      } catch (error) {
        console.log("Error fetching contacts:", error);
      }
    };

    getContacts();
  }, []);

  return (
    <><div className="max-w-[480px] m-auto px-4">
    <Navbar />
    <div className="flex gap-2 my-4">
      <div className="flex flex-grow relative items-center px-4">
        <FiSearch className="absolute text-white text-2xl ml-3" />
        <input
          type="text"
          className="border flex-grow bg-black rounded-md text-xl text-white h-10 pl-10"
          placeholder="Search contacts"
        />
      </div>
      <AiFillPlusCircle onClick={onOpen} className="text-5xl text-red-500" /> 
    </div>
    {contacts.map((contact) => (
      <Contactcard key={contact.id} contact={contact}/>
    ))}
  </div>
  <Modal onClose={onClose} isOpen={isOpen}/>
  </>
    
  );
}

export default App;
