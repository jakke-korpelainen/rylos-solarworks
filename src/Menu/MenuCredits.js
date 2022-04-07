import { Menu, MenuActions, MenuActionItem } from "./Menu"
import styled from "styled-components"
import selectAudio from "../audio/select.wav"
import useStore from "../store"
import { Wave } from "../Wave"

export const MenuCredits = () => {
  const actions = useStore((state) => state.actions)

  return (
    <Menu>
      <Wave words={["Credits"]} />
      <Credits>
        <p>
          <a href="https://github.com/jakke-korpelainen/rylos-space-adventure">Source code</a>
        </p>
        <h2>Programming</h2>
        <p>
          <a href="https://jakke.fi">Jakke Korpelainen</a>
        </p>
        <p>
          Based on tremendous work of <a href="https://github.com/drcmda">drcmda</a>
        </p>
        <h2>Assets</h2>
        <p>
          Ship: <a href="https://sketchfab.com/themuffincoder">TheMuffinCoder</a>
        </p>
        <p>
          Rocks: <a href="https://sketchfab.com/dzemalmclaren">Dzemal Semanic</a>
        </p>
        <p>
          Crash sound created by <a href="https://freesound.org/s/95078/">sandyrb</a>
        </p>
        <h2>Music</h2>
        <p>
          <a href="https://www.rylosplanet.fi/">Rylos</a>
        </p>
      </Credits>
      <MenuActions>
        <MenuActionItem
          onClick={() => {
            new Audio(selectAudio).play()
            actions.menu.start()
          }}>
          Back
        </MenuActionItem>
      </MenuActions>
    </Menu>
  )
}

const Credits = styled.div`
  width: 100%;
  margin-top: 2rem;

  a {
    color: white;
  }
`
