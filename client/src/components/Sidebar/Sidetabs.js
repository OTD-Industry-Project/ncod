import React, { useState } from 'react';
import { FiHome, FiChevronLeft, FiCompass, FiSettings } from "react-icons/fi";
import { Sidebar, Tab } from './react-leaflet-sidetabs';
import './Sidebar.css';

const Sidetabs = (props) => {

   const [openTab, setOpenTab] = useState('/#schedule');

   const onClose = () => {
      setOpenTab(false);
   }

   const onOpen = (id) => {
      setOpenTab(id);
   }

   return (
      <section >
         <Sidebar

            position="left"
            collapsed={!(openTab)}
            selected={openTab}
            closeIcon={<FiChevronLeft />}
            onClose={onClose}
            onOpen={onOpen}
         >

            <Tab id="/#schedule" header="Schedule" icon={<FiHome />}>
               {props.children}
            </Tab>
            <Tab id="/#spare" header="Spare" icon={<FiCompass />}>


               <h3>rehomeControls</h3>
               <h4>boolean</h4>
               <p>Whether or not to automatically adjust control elements to align with the sidetabs</p>

            </Tab>
            <Tab id="/#settings" header="Settings" icon={<FiSettings />} anchor="bottom">
               <button className="btn btn-primary mt-5" onClick={props.switchTheme} >Switch theme</button>
            </Tab>

         </Sidebar>
      </section>
   )

}

export default Sidetabs;