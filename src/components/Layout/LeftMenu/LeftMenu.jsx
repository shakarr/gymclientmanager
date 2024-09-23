import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../../../utils/motion";

import useAuth from "../../../hooks/useAuth";

import "./leftMenu.scss";

export function LeftMenu() {
  const { auth, loading } = useAuth();
  const { pathname } = useLocation();

  const isCurrentPage = (route) => {
    return route === pathname;
  };

  return (
    <>
      <div className="left-menu">
        <Menu secondary vertical fluid>
          <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div variants={fadeIn("right", "spring", 0.2, 0.6)}>
              <Menu.Item
                as={Link}
                to="/"
                name="Inicio"
                icon="home"
                active={isCurrentPage("/")}
              />
            </motion.div>
            <motion.div variants={fadeIn("right", "spring", 0.3, 0.6)}>
              <Menu.Item
                as={Link}
                to="/dietas"
                name="Dietas"
                icon="utensils"
                active={isCurrentPage("/dietas")}
              />
            </motion.div>
          </motion.section>
        </Menu>

        {/* <Menu secondary vertical fluid>
          <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div variants={fadeIn("right", "spring", 0.3, 0.6)}>
              <Menu.Item
                as={Link}
                to="/guias"
                name="Guias"
                icon="book"
                active={isCurrentPage("/guias")}
              />
            </motion.div>
          </motion.section>
        </Menu> */}
      </div>
    </>
  );
}
