import React from "react";
import Chapter, { ChapterEnd } from "../components/Chapter";
import Section from "../components/Section";
import Goto from "../components/Goto";
import Choice from "../components/Choice";
import Option from "../components/Option";
import Text from "../components/Text";
import WaitForInput from "../components/WaitForInput";
import If from "../components/If";
import NL from "../components/Newline";

const SAMLoading = () => (
  <React.Fragment>
    <Text.Delay ms={1000} />.<Text.Delay ms={1000} />.<Text.Delay ms={1000} />.
    <Text.Delay ms={1000} />.<Text.Delay ms={5100000} />.<NL />
  </React.Fragment>
);

export default props => (
  <Chapter entry="chapter-one-intro" {...props}>
    <Section uid="chapter-one-intro">
      <Text>
        Chapter 1<NL />
        Deep space, 2267
        <NL />
        You awake to the chime of a system alert pinging against your skull. You
        open your eyes and your wetware drops out of sleep mode. A HUD unfolds
        in virtual space in front of you, like a virtual visor sitting over your
        face.
      </Text>
      <WaitForInput>Look at Visor</WaitForInput>
      <Text>
        On the left, you see readouts from the engines of your ship. Nozzle
        temperatures and fuel flow look the same as before you nodded off. On
        the right, you can see a panel of status lights. The TCAS light is
        flashing red. Proximity warning.
      </Text>
      <WaitForInput>Look at Real-Space</WaitForInput>
      <Text>
        You focus your attention towards real-space. The HUD fades away like as
        it detects a change in your attention. You see a discarded wrapper
        floating in the bridge. Zero-G.
        <NL />
        “SAM”, You say, summoning the ship’s AI.
      </Text>
      <Goto section="chapter-one-wakeup-options" />
    </Section>

    <Section uid="chapter-one-wakeup-options">
      <Text>What do you say?</Text>
      <Choice>
        <If
          expr={({ entered }) => !entered("chapter-one-distance-from-target")}
        >
          <Option section="chapter-one-distance-from-target">
            “What’s our distance from target?”
          </Option>
        </If>
        <If
          expr={({ entered }) =>
            !entered("chapter-one-open-channel-to-dispatch")
          }
        >
          <Option section="chapter-one-open-channel-to-dispatch">
            “Open a channel to dispatch.”
          </Option>
        </If>
        <If
          expr={({ entered }) =>
            entered("chapter-one-distance-from-target") &&
            entered("chapter-one-open-channel-to-dispatch")
          }
        >
          <Option section="chapter-one-approach-checklist">
            “SAM, let’s run the approach checklist.”
          </Option>
        </If>
      </Choice>
    </Section>

    <Section uid="chapter-one-distance-from-target">
      <Text>
        “What’s our distance from target? Why aren’t we braking?”
        <NL />
        “Distance from target approximately
        <SAMLoading /> ten thousand kilometers
        <NL />
        <Text.Delay ms={500} />
        Closest approach in <SAMLoading /> T minus 3 minutes 31 seconds
        <NL />
        <Text.Delay ms={500} />
        Reactor scram triggered after crossing safe radiation range from
        target.”
        <NL />
        <If
          expr={({ entered }) =>
            !entered("chapter-one-open-channel-to-dispatch")
          }
        >
          The AI, SAM--as you told him to call himself, curtly answered all your
          questions. Sometimes you wish you had sprung for the personality
          upgrade, but it required installing a big red eye and you didn’t want
          to ruin the vibe of your cockpit. So instead your ship had a
          oppressively monotonic disembodied voice.
        </If>
      </Text>
      <Goto section="chapter-one-wakeup-options" />
    </Section>

    <Section uid="chapter-one-open-channel-to-dispatch">
      <Text>
        “Open a channel to dispatch.”
        <NL />
        “Standby while a channel is opened.”
        <NL />
        <If
          expr={({ entered }) => !entered("chapter-one-distance-from-target")}
        >
          The AI, SAM--as you told him to call himself, curtly answered all your
          questions. Sometimes you wish you had sprung for the personality
          upgrade, but it required installing a big red eye and you didn’t want
          to ruin the vibe of your cockpit. So instead your ship had a
          oppressively monotonic disembodied voice.
        </If>
      </Text>
      <Goto section="chapter-one-wakeup-options" />
    </Section>

    <Section uid="chapter-one-approach-checklist">
      <Text>
        “SAM, let’s run the approach checklist.”
        <NL />
        “Ok. Running approach checklist.”
      </Text>
      <Goto section="chapter-one-control-program-intro" />
    </Section>

    <Section uid="chapter-one-control-program-intro">
      <Text>
        You focus on the image: Blue Sky from Horizon to Horizon. This image is
        the preset that triggers your wetware to start the control program for
        the ship. The visor folds away and the spherical walls of the bridge
        divide into hexagonal tiles about a foot in size.
        <NL />
        As the tiles fade away, a star field comes into view. A line stretches
        towards infinity in front of you -- your velocity vector -- with
        perpendicular lines crossing the line at intervals, counting down the
        meters to the closest approach to your target.
        <NL />
        One mark zips past you. You can already see the next mark rapidly
        closing on you. Your gut drops a bit as your brain tried to understand
        how you are hurling so fast through the void.
      </Text>
      <Goto section="chapter-one-checklist-options" />
    </Section>

    <Section uid="chapter-one-checklist-options">
      <Text>
        You see a number of items projected on your visor. What do you do?
      </Text>
      <Choice>
        <If expr={({ entered }) => !entered("chapter-one-checklist-thrusters")}>
          <Option section="chapter-one-checklist-thrusters">
            Chemical Thrusters
          </Option>
        </If>
        <If
          expr={({ entered }) => !entered("chapter-one-magnetic-tether-check")}
        >
          <Option section="chapter-one-magnetic-tether-check">
            Magnetic Tether
          </Option>
        </If>
        <If expr={({ entered }) => !entered("chapter-one-time-to-approach")}>
          <Option section="chapter-one-time-to-approach">Broadcast Hail</Option>
        </If>
        <If
          expr={({ entered }) =>
            entered("chapter-one-checklist-thrusters") &&
            entered("chapter-one-magnetic-tether-check") &&
            entered("chapter-one-time-to-approach")
          }
        >
          <Option section="chapter-one-checklist-complete">
            Finish approach checklist
          </Option>
        </If>
      </Choice>
    </Section>

    <Section uid="chapter-one-checklist-thrusters">
      <Text>
        You look at the item on the checklist appears projected on your virtual
        visor:
        <NL />- Chemical thrusters: Check?
        <NL />
        You look down at the digital model of your ship. Since she was still
        rigged for braking, the longest axis of the ship is perfectly aligned
        with the velocity vector.
        <NL />
        At the front, the massive nozzle of your fusion reactor. It is studded
        with supporting equipment--a tangle of wires, pipes and panels.
        <NL />
        Unceremoniously welded to the choke point of the nozzle is a massive
        sphere--the containment vessel for the heart of your ship--the fusion
        reactor. The sphere is bolted and embedded within a scaffold of iron
        hexagons that came together on the opposite side of the nozzle to form a
        rectangular box girder.
        <NL />
        You stretch your arm out in front of you and hold your hand up, palm
        out. The command to thrust in the direction of your arm.
        <NL />
        Pinpoints of light spear--light and shadows playing off the hair-thin
        trusses that you can now see are attached at various points along the
        propulsion bus.
        <NL />
        You can feel the jutter of thrusters firing in your bones as they
        implement the command to fire through a delicate dance of mass and
        newtonian physics.
        <NL />
        “Thrusters check.” you reply.
      </Text>
      <Goto section="chapter-one-checklist-options" />
    </Section>

    <Section uid="chapter-one-magnetic-tether-check">
      <Text>
        “Magnetic tether, check?”
        <NL />
        You move your eyes down from the reactor and follow along the long truss
        that make up the backbone of the ship--the thrust plate.
        <NL />
        First, nearest to the reactor, are attached the propulsion tanks. 6 of
        them, shaped like white giant pill capsules, arranged radial around the
        truss. you normally only ran with 3 prop tanks, but the endurance of
        this mission called for extra fuel unless you wanted to sit and wait for
        the planets to align--literally. Next, came the radiation-shielding
        Section. Six massive silica radiator fins rose out like from the truss
        like petals on a flower. All of them glowing red hot from dissipating
        the heat of the reactor during braking. My little red void rose, you
        thought. Then, came the radiation shielding proper in the form of both
        large magnetic coils as well a large sheets of high density metals just
        for good measure. Finally, came the portion you always allocated for
        mission equipment. Bolted to the side of the truss was a large yellow
        platform with a large reel of steel cable. A hingle and massive
        hydraulic cylinders connected the platform with a mechanical arm. At the
        end of the arm, was a large disc connected to a thruster pack. you had
        once see videos of electromagnetic cranes used in junkyards on Earth
        from the late 20th century. you had been struck by how similar it looked
        to the magnetic tether. you picked up the glowing white bubble sitting
        above the crane arm and held it in front it me. you squeezed the bubble
        and activating the crane. you then moved your arm around. The crane arm
        mimicked your movements perfectly. “Magnetic tether, check.” you said
        aloud, continuing the ceremony of the checklist. you released bubble,
        releasing control of the crane arm.
      </Text>
      <Goto section="chapter-one-checklist-options" />
    </Section>

    <Section uid="chapter-one-time-to-approach">
      <Text>
        “Check time to nearest approach.” you continue.
        <NL />
        <Text.Delay ms={1000} />
        “Time to closest approach, T minus 2 minutes 30 seconds.”
        <NL />
        “Start broadcasting the standard salvage hail towards the target.”
        <NL />
        “Acknowledged.”
        <NL />
        On a muffled side-band you could hear the salvage hail broadcasting
        through the radio telescopes on the ship.
        <NL />
        “Message repeats: Unidentified ship at our bearing one eight zero please
        respond. A ‘Tow or Salvage’ warrant on your ship has been issued by the
        United Colonies Government, Department of Internal Space. Under
        authority of 103.§53.1..."
        <NL />
        You tune out the legal part of the message.
        <NL />
        ‘Unidentified ship.’ you think.
        <NL />
        ‘That’s weird.’
        <NL />
        Do you inspect the ship closer?
      </Text>
      <Choice>
        <Option section="chapter-one-time-to-approach-look-closer">
          Look closer.
        </Option>
        <Option section="chapter-one-checklist-options">
          Continue running checklist.
        </Option>
      </Choice>
    </Section>

    <Section uid="chapter-one-time-to-approach-look-closer">
      <Text>
        Your eyes move up the green line of velocity. You can see the distance
        markers converge on a distance point. As you look towards it, a panel
        appears next to it.
        <NL />
        ----------------------
        <br />
        Name: ??????
        <br />
        Transponder: OFFLINE
        <br />
        ----------------------
        <NL />
        “That’s weird. Sam, why aren’t you getting a transponder?”
        <NL />
        “Unknown
        <SAMLoading />
        All radio transmitters are functioning normally.”
        <NL />
        You stare at the panel for a few seconds longer. You are about to zoom
        in on the target and take a look at it through the ship’s telescopes,
        but your train of thought was interrupted by SAM.
        <NL />
        “Broadcast complete.”
      </Text>
      <Goto section="chapter-one-checklist-options" />
    </Section>

    <Section uid="chapter-one-checklist-complete">
      <Text>
        Sam interupts your train of thought
        <NL />
        “Channel open. Current light delay is… 16 minutes 23 seconds.”
        <NL />
        “Jeez, this thing is out in boonies isn’t it?”
        <NL />I don’t recognize the intent of your question”, the AI answered
        without humor.
        <NL />
        “Disregard.”
        <NL />
        You try to shake yourself out of the lull created by running the
        checklist with a witless computer.
        <NL />
        “SAM, start reading out time to closest approach as we go.”
        <NL />
        “Acknowledged. Time to closest approach: T minus 2 minutes 9 seconds.”
        <NL />
        “SAM, Starting sending message.”
        <NL />
        “Acknowledged.”
        <NL />
        “CAPCOM, This is alpha kilo echo 42 23. How copy? I am about 2 minutes
        from closest approach. With this light delay--I’ll already be in there,
        lighting the candles before you ping back. Please advise on destination
        of cargo.”
        <NL />
      </Text>
      <ChapterEnd />
      <Text>
        You nodded away the AR world created by your wetware and grab the
        harness which holds you in the chair suspended in the middle of the
        bridge. you clicke chest restraints of the harness and push off towards
        the storage room hatch. Well, storage room was a stretch. It was more a
        repurposed closet, but it worked for your needs. Right before you plowed
        into the hatch, you reached out and stopped myself with your arms,
        quickly grabbing a hand hold. you punched open the hatch and started
        going through items trying to find your EVA gear. “I am rigging for EVA.
        I will update you when target is captured.” “SAM, end message. Send
        message.” “Acknowledged. Message response will take at least 32 minutes
        46 seconds. Reminder: Time to closest approach, T minus 1 minute 3
        seconds.” “Shit, SAM". It took longer to get your suit on than you
        thought. You pause, thinking for a second. “I guess I gotta cut some
        corners on the procedures.” You clicked your helmet on. Through the
        sixth sense of the wet-ware, you could feel the suit interface with the
        computers embedded within me. “SAM, blow atmosphere on the bridge.
        Prepare for pilot EVA. Set attitude mode: inertial.” “Acknowledged.”
        Sounds muffled and then disappeared as the atmosphere inside the ship
        thinned. Over the past few days, you had had SAM run an acclimatization
        procedure to get me used to the pressure suit’s atmosphere. This meant
        you didn’t have to wait to put on the pressure suit. Which meant we
        could have fun quicker. you turned in place, facing the exterior hatch.
        you reached out with the sixth sense of your wet-ware and tried to move
        forward. A swarm of cold-gas thrusters fired in patterns, pushing me
        forward at a steady walking speed. you grabbed the panel for the outside
        hatch in AR. It popped open a bit red button. you love big red buttons.
        And pressing them. you pressed it. The hatch opened slowly. Even though
        you had just seen it in AR, you always felt the stars looked better in
        person. you moved outside on a cloud of cold gas thrusters. Ahead, the
        view of the target was blocked by the mass of the radiator fins of your
        own ship. Which was nice because you would rather they block any stray
        rems coming off your reactor. Around them, you could catch a glimpse of
        a massive rectangular block. The ship was painted a reflective white
        color, causing it shine brightly in the harsh sunlight of space. At one
        of end of the block, you could just make out the cones of multiple drive
        blocks. you could just start to see a forest of attentae around the
        front. “SAM, start message. CAPCOM. Alpha kilo echo 42 23. you can’t
        read target’s transponder. you have visual on target. Target appears
        intact and does not have any visible damage to comms. Array. Please
        advise on the nature of the target.” you looked through AR at the
        target. The ship’s telescopes kicked into action and your field of
        vision zoomed towards it. It was definitely a cargo carrier of some
        sort. Not a bulk carrier, like mine, designed for long hauls and lots of
        cargo. Rather this was something designed to move something discreetly
        and quickly through the system. State of the art, too, judging from the
        equipment you could see on the outside. Much more efficient fusion
        drive. No need for bulky radiators like your girl. “Target is a, uh…,
        cargo ship of some sort. Tail number is not visible to ship’s
        telescopes.” Just then, something clicked into place. How could you be
        so dumb? Second law of thermodynamics, stupid. “Additional information,
        CAPCOM. No external signs of reactor activity, and radiators are dark.
        She’s been powered down for a while. Man, looks like this tow is gonna
        take a while.” you said the last part mostly to myself. “James. T minus
        15 seconds to closest approach.” SAM chimed in. you nodded away the AR
        image of the ship, but could see it wasn’t really needed. The ship
        loomed large behind the radiator fins. you turned your back to the ship,
        looking away from the direction of travel. you reached out to your boots
        with your sixth sense and engaged the electromagnetic coils buried
        within them. you reached out in AR and grabbed onto the magnetic tether.
        you felt a tingle of pins as your arm and the robotic arm become one.
        you counted down the seconds silently to myself as a field on the visor
        of your suit did the same. Everything was quiet except the low hum of
        the suit’s environment control systems and the sound of your own breath.
        In the shadow of your ship, you could look out at the infinite field of
        stars in the sky. Of course, you could see them whenever you wanted in
        AR, but it wasn’t the same. “T minus 3, 2, 1. Mark.” SAM cut in again.
        you didn’t have time to scold him for breaking your perfect moment. The
        ship whizzed past me. you glanced at your wrist in AR to ensure that the
        mode for the reel was not set to “BRAKE”. you didn’t want to be thrown
        off the ship by snagging this guy. you put your hand out in front of me
        with your palm out. The magnetic tether’s robotic arm mirrored mine
        exactly. you reached out with your sixth sense and called on it to fire.
        you felt a sudden jolt in the bones of your body as the rocket pack on
        the end of the tether fired. The familiar staccato patterns of thrusters
        immediately started to work against it. you could see end of the tether
        flying off after the ship through the ship’s telescopes. It flapped this
        way and that way as though fluttering in breezes of cold nitrogen gas.
        you reached out with your sixth sense, guiding it towards the receding
        ship. you felt the end of the tether attach to the target through your
        sixth sense. It was as though your hand had grown a sucker and using it
        you had sucked onto the cold metal side of ship. Immediately, you could
        feel the cable being pulled by the inertia of our two ships parting. you
        wasn’t in a big rush to stop out ships from parting. you had kilometers
        of cable to spare in the tether. you was free to use the tether’s BRAKE
        mode. Hidden within the tether’s drum was thick oil. Using a fan to turn
        against the viscosity of the oil, you could dump our difference in
        inertia into heat energy. Second law of thermodynamics, ladies and
        gentlemen! However--due to a literal alignment of planets--you had fuel
        to spare on this mission. you reached towards the ships thrusters and
        willed the ship to thrust against our direction of travel again. The
        thrust came in waves through your boots. The ship started dropping away
        from me. Appearing to move upwards as our orbital speeds changed. you
        moved the vector of thrust for the ship to compensate. you could see the
        ship become still against the field of stars. “SAM, re-engage inertial
        hold mode.” “Acknowledged.” Again, you looked at your wrist. you flicked
        the mode on the magnetic tether to “BRAKE” and released control on the
        magnetic tether. you unlocked your boots from the thick steel panels
        that made up the outside of the bridge and turned towards the platform
        of the magnetic tether. you floated forwards. Now that we’ve zero-d our
        relative velocity, there’s no need to hurry. “SAM. Please remind me when
        the round-trip light delay interval is over. you want to know when you
        should expect to hear back from CAPCOM.” “Roger. Your first message will
        reach Dispatch in about 14 minutes. The minimum time to response is
        about 30 minutes.” you thought for a second. “SAM, did you just change
        the way you speak? You just used ‘Roger’, not ‘Acknowledged’”. “you
        don’t know what you mean, James.” Being this far out from civilization
        was starting to creep me out. Maybe it’s the silence of working in zero
        atmosphere or the atmosphere of living with your own breath, but working
        in a suit for long periods of times can make one prone to superstition.
        you reached down to your belt and grabbed a tool. It looked like a
        trapezoid made out of fat aluminum tubes. It had an arrangement of 4
        pulleys at each of the vertices of the trapezoid. The Handi-Tether
        Traversal Tool™ was the fastest and cheapest way across the gap. In the
        seconds that it took the tether to fly, we had lost a lot of meters. you
        could have used AR to check it, but you figured we had at least a
        kilometer to go. “Take care, James” “SAM, you swear you’re acting weird.
        Standby for now.” “Ok, James” you clicked the tether onto the steel
        cabling coming out from the top of the mechanical arm. you checked the
        battery panel on the side. Nearly 100% battery. Good. Not that you’m
        worried. The Handi-Tether Traversal Tool™ has ‘Patent-pending
        super-Solar tech! Guaranteed not to need charging for at least 10
        years!’. At least that’s what a company sales rep told me before you
        bought it. you’ve never actually seen any solar panels on this thing now
        that you’ve thought about it. you braced myself through your sixth
        sense. The bio-muscles on your suit tensed up and locked in place around
        the grip you had on the tool. you pushed a button on the panel of the
        tool. you started zipping off towards the distant ship. “SAM, start
        another message.” “CAPCOM, you’ve rendezvoused with the target, and am
        currently progressing along the tether. Target has not responded to
        standard salvage hail. you am proceeding with mission. Please advise
        about final disposition of cargo. In the meantime, you am going to
        investigate propellent reserves onboard and then try to restart the
        reactor core.” “SAM, send message.” “you’ve sent that message for you,
        James.” “You’re doing it again SAM! What’s going on. You never talk like
        this.” “you don’t know what you mean, James.” “Deactivate yourself, SAM.
        you’ll take a look at you later.” “If that’s what you want, James.” “But
        keep the radio live.” you quickly added after thinking for a second. My
        comment was met with silence. you assumed that he heard that. you looked
        towards the brilliant white ship. The starfield darkened as the sun
        filters in your helmet adapted to the strong light. you suddenly felt as
        though you was examining a model against black velvet. you zoomed in
        with ships telescopes and scanned the exterior again. you could now see
        that the ship’s skin which had looked completely smooth from a distance
        was actually made of little square panels. you searched the entire
        surface of the ship, looking for some break or indication of entry
        point, but there were no marks and nothing of note other than the
        regular grid of squares. you noticed that you was already well past the
        halfway point of the tether. you reached out to the humming tool and
        flipped a switch inside it with your mind. The braking force from the
        device rolled through your arms. The little AI of the tool was having to
        use way more force than normal since you’d overshot your mark. The
        surface of the ship loomed large in front of me. you couldn’t help but
        think of it as the arch of firmament, with me rushing headlong up
        towards it. you mentally reached out thinking “BRAKE”. It didn’t do
        anything since this dumb little tool doesn’t have a sixth sense
        attachment, but the little AI was smart enough to bring me to a stop
        without flinging me off the wire. The tetherpack had hit almost exactly
        in the center of ship. you engaged your magnetic boots and knelt down to
        look at the panel. Suddenly, you was spinning. As you tumbled, it
        clicked in your head that your boots had not stuck to the panel. you
        activated the suit’s thrusters. My spin was quickly arrested. you looked
        back at the tetherpack. It had landed hard and had punched through a
        panel. It seemed to be clinging to some internal piece of machinery. ‘So
        the panels aren’t very strong’. you thought. ‘Let’s try another way in’.
        Hey. They pay us as long as the cargo’s intact. “External skin appears
        to be non-ferromagnetic. No indication of any airlock. Was not expecting
        this CAPCOM. you’m going to try another way in.” you floated up the
        panel. you could see tiny screws barely visible in the panel. Each
        carefully painted to match the color of panel. you reached out with your
        glove. you used your sixth sense to select a glove tool. My gloved
        fingertip reformed as it became as screwdriver bit. you carefully
        removed the screws and stored them. Always helps to clean up in space.
        you tugged at the panel and finally engaged the suit’s bio-muscles. The
        panel finally came free. you poked your head in. “you see. CAPCOM, you
        have breached the outer hull, but target is double-halled. you’m going
        to investigate the inner hull for an entry. you will advise when you’ve
        gained entry into the ship.” As you gripped onto the edge of hole you’d
        made in the outer hull, you could feel a jerk come through the hull. you
        then felt a series of vibrating tugs. you could almost swear you heard a
        shrill creaking noise. Obviously that couldn’t be the case though.
        There’s no noise in space. Must be vibrations from thrusters of your
        ship through the cable. you remember that you’d told SAM to hold
        position though. So what caused the ship to move? you think you’ve been
        in this game for too long. These deep space solo jobs will get to you.
        Some of the old timers used to say it was staring at the stars for too
        long. Lots of scientists say it’s the cosmic radiation you get from
        years in the suit. you, for one, am leaving the jury out on it for now.
        Don’t signal to stop the bus unless you want to get off. The inner hull
        was dark and cramped. Unlike the featureless outer hull, the inner hull
        had tangles of equipment, pipes, and wires weaved through it. you had to
        move and dodge as you moved along try to find the goal of your current
        step in the mission. Now that you’d moved inside a bit, you could barely
        see your hand in front of me in visible light. However, your suit could
        see in a wide band of EM bands, so you could still see the contours of
        it through your sixth sense, the image inferred through a synthesis of
        heat, radio, and other sensors. you could make out the outline of a
        panel on the inner hull. No power, no AR. No work. you opened up the
        panel and grabbed the manual release lever. Not a big red button, but
        you can work with it. you pumped the manual release lever using the
        enhanced strength of the suit. The oil gushed through the system, moving
        various parts of the system until you saw six pins around the circular
        hatch pop out. you turned the lever and pushed in. The hatch itself
        slowly started to float away from its mount. you pulled the lever on the
        hatch to swing it open fully. you rushed towards the hatch. Inside, you
        could see the pale green screen of the airlock hanging in the inky
        black. “Ok, so the airlock is running on internal batteries only. you
        repeat, ship appears to have no battery backups active. Airlocks are in
        emergency mode.” you reached out of the airlock panel with your sixth
        sense. For a second nothing happened. “Oh yeah. Emergency mode doesn’t
        have enough power for AR.” you said to myself. you punched “FAST CYCLE”
        on the airlock. The outside hatch automatically started to close. you
        jerked it close and turned the lever. As it locked, you hear a thin,
        high ‘beep’ as the airlock cycled. “SAM--check atmospheric content.” No
        need to waste vacuum time if you don’t have to. you waited for a few
        seconds. “SAM?” Apparently he took the command to turn himself off
        pretty seriously. Or he’s ignoring me. He sure is acting weird today.
        you looked down at your wrist through AR. you could see a readout for
        the atmosphere sensors. you added it all up in your head and nodded to
        myself. As you clicked the helmet off, the AR overview slide away.
        Without the helmet muffing the sounds around me--that’s when you
        realized what was was bugging me about this ship. It was completely
        silent. you’d been inside powered down ships before, but never one with
        all the batteries drained like this. Every ship has large battery backup
        units and solar panels which automatically deploy in the event of main
        engine power failures. Without your helmet’s displays and sensors, My
        world changed from bright and multicolored to pitch black. The panel on
        the airlock cast a small pool of green light around me, sending out deep
        shadows. There’s an old saying among spacers. ‘Just as a body without
        breath is a corpse, a ship without power is a coffin.’ Sitting in the
        quiet of the ship, you felt a chill go down your spine as you remembered
        this saying. But you had a job to do, and you wasn’t going to let
        something like that get the better of me. “CAPCOM, ship is completely
        dark. you’ve never seen a ship so drained. She must have been on the
        float for a while, huh? The emergency solars must not have deployed.
        you’m going to head to engineering to see if you can get some power in
        here.”
      </Text>
      <ChapterEnd />
    </Section>
  </Chapter>
);
