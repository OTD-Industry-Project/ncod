import React, { useState } from 'react';
import { FiHome, FiChevronLeft, FiCompass, FiSettings } from "react-icons/fi";
import { Sidebar, Tab } from '@pusky/react-leaflet-sidetabs';
import './Sidebar.css';

const Sidetabs = (props, { schedule, activeCallBack }) => {

   const [openTab, setOpenTab] = useState('/#schedule');

   const onClose = () => {
      setOpenTab(false);
   }

   const onOpen = (id) => {
      setOpenTab(id);
   }

   return (
      <section className="Sidebar">
         <Sidebar
            position="left"
            collapsed={!(openTab)}
            selected={openTab}
            closeIcon={<FiChevronLeft />}
            onClose={onClose}
            onOpen={onOpen}
            >

            <Tab id="/#schedule" header="Schedule"  icon={<FiHome />}>
               {props.children}
            </Tab>
            <Tab id="/#spare" header="Spare" icon={<FiCompass />}>

               
               <h3>rehomeControls</h3>
               <h4>boolean</h4>
               <p>Whether or not to automatically adjust control elements to align with the sidetabs</p>

            </Tab>
            <Tab id="/#settings" header="Settings" icon={<FiSettings />} anchor="bottom">
               <p>The button for this tab can be anchored to the bottom by using the <code>anchor="bottom"</code> props on the <code>Tab</code> component</p>
            </Tab>

         </Sidebar>
      </section>
   )

}

export default Sidetabs;