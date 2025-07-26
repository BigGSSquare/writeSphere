import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
const Writepagedropdown = () => {
  return (
    <Menu>
      <MenuButton>Category</MenuButton>
      <MenuItems anchor="bottom">
        <MenuItem>
          <button className="block data-focus:bg-blue-100" href="/settings">
            Tech
          </button>
        </MenuItem>
        <MenuItem>
          <button className="block data-focus:bg-blue-100" href="/support">
            Anime
          </button>
        </MenuItem>
        <MenuItem>
          <button className="block data-focus:bg-blue-100" href="/license">
            Politics
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default Writepagedropdown;
