import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ModalCrossIcon } from "./Svgs";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/Brainz-logo.png";
import { Button } from "./Button";
import { CustomCheckbox } from "./Checkbox";

const ConditionsModal = ({
  isOpen,
  closeModal,
  onAccept,
  toggleNotification,
}) => {
  const [checkedOne, setCheckedOne] = useState(false);

  const handleContinue = (e) => {
    e.preventDefault();
    if (checkedOne) {
      onAccept();
      closeModal();
    }
  };
  const handleModalClose = () => {
    closeModal();
    toggleNotification();
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 " onClose={handleModalClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full p-[16px] md:p-[0] max-w-[1176px] text-center text-white transform overflow-hidden rounded-[20px] bg-primary-350  text-left align-middle shadow-xl transition-all">
                <div className="md:h-[100%] h-[580px] py-4 pr-4 md:px-[50px] scrollbar scrollbar-w-[6px] scrollbar-thumb-rounded-full scrollbar-thumb-[#104061] overflow-y-scroll">
                  <div className="flex flex-col justify-center items-center pt-[0] md:pt-7">
                    <Link href={"/"}>
                      <Image
                        src={logo}
                        alt="Logo"
                        width={104}
                        height={60}
                        draggable={false}
                        priority={true}
                      />
                    </Link>
                    <h1 className="font font-basement font-bold text-2xl md:text-3xl">
                      Terms & Conditions
                    </h1>
                    <p className="font-inter font-normal text-base text-grey-100">
                      You agree to our Terms of Use and License Terms.
                    </p>
                    <div className="text-grey-100 text-start rounded-[10px] pl-4 pr-[6px] py-3 mt-6  border border-[#51626e] ">
                      <div className="pr-[14px] h-52 scrollbar scrollbar-w-[6px] scrollbar-thumb-rounded-full scrollbar-thumb-[#104061] overflow-y-scroll">
                        <h1 className="font-inter font-bold text-lg mb-4">
                          Terms of Service - PlayBrainz.com
                        </h1>
                        <h1 className="font-inter font-normal text-lg mb-5">
                          Issued on June 4 2024
                        </h1>
                        <p className="text-base font-inter font-normal mb-4">
                          These Terms and Conditions form a binding legal
                          agreement between You and Us and apply to your use of
                          our Platform, Website or games in any way, through any
                          electronic device (web, mobile, tablet or any other
                          device).
                        </p>
                        <p className="text-base font-inter font-normal mb-4">
                          Please note that these Terms and Conditions include a
                          provision waiving the right to pursue any class, group
                          or representative claim and requiring You to pursue
                          past, pending, and future disputes between You and Us
                          through PlayBrainz’s escalation process unless You opt
                          out within the specified time frame.
                        </p>
                        <p className="text-base font-inter font-normal mb-6">
                          You must read these Terms and Conditions carefully in
                          their entirety before checking the box for acceptance.
                          By checking the box for acceptance during the
                          registration process, or by accessing the Games or the
                          Platform, You confirm that you have read and agree to
                          be bound by these Terms and Conditions, which include
                          and are inseparably linked to our Privacy Policy and
                          other promotion-specific or game-specific terms
                          relevant to your Participation. If you do not agree
                          with any provision of these Terms and Conditions or
                          any other linked policy, rules or terms you may not
                          install or use the Platform.
                        </p>
                        <ul
                          role="list"
                          class="marker:text-sky-400 list-disc pl-4"
                        >
                          <li className="uppercase">DEFINITIONS</li>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal my-4">
                            <span>1.0.</span> Collective Action means any claim
                            as part of a class, group, collective, coordinated,
                            consolidated, mass, or representative proceeding.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>1.1.</span>Content – means text, graphics,
                            user interfaces, visual interfaces, photographs,
                            trademarks, logos, sounds, music, artwork, computer
                            code and other material used, displayed or available
                            as part of the Games and Platform.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span> 1.2.</span>Customer Account – means an
                            account held by a Registered Customer.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>1.3.</span>"Competition Excluded
                            Jurisdiction(s)" means:
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>1.3.0.</span>Afghanistan, Algeria, Angola,
                            Belarus, Burma, Central African Republic, Cuba,
                            Democratic Republic of the Congo, Eritrea, Haiti,
                            Holy See, Iran, Iraq, Kyrgystan, Lebanon, Libya,
                            North Korea, Palestine State, Republic of Ireland,
                            Rwanda, Sierra Leone, Somalia, South Sudan, Sudan,
                            Syria, Venezuela, Yemen, Zimbabwe and the American
                            states of Nevada (USA), Washington (USA), Georgia
                            (USA), Minnesota (USA), Mississippi (USA), Montana
                            (USA), South Dakota (USA) and any other countries,
                            territories or jurisdictions in which it would be
                            illegal to play Games or redeem Prizes.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span> 1.4. </span>Fraudulent Conduct– means any of
                            the conduct described in clause 18.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span> 1.5. </span>Game(s) – means any one or more
                            PlayBrainz Game(s) available on the Platform. We
                            reserve the right to add and remove Games from the
                            Platform at our sole discretion.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span> 1.6. </span>Inactive Account means a Customer
                            Account which has not recorded any log in or log out
                            for a period exceeding 12 consecutive months.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span> 1.7. </span>"Mail-in Member" means a
                            registered user who has completed Mail-In
                            Registration (AMOE).
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span> 1.8. </span>Participate means playing any
                            Games or using our Platform in any manner
                            whatsoever, including any of the conduct described
                            in clause 2.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span> 1.9. </span>Payment Administration Agent
                            means any related body corporate, affiliate, or
                            third party we appoint to act as our agent.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span> 1.10.</span> Platform means any URL or mobile
                            application belonging to, or licensed to, PlayBrainz
                            and branded as part of the “PlayBrainz” family of
                            games, including the website located at
                            https://www.PlayBrainz.com, and all subdomains,
                            subpages and successor sites thereof, as well as all
                            Games, features, tools and services available
                            thereon.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span> 1.11.</span> Player or You, you, your or Your
                            means any person who Participates, whether or not a
                            Registered Customer.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span> 1.12.</span> Registered Customer means a
                            Player who has successfully registered a Customer
                            Account, whether that account is considered active
                            or not.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span> 1.13.</span> Service means the availability
                            and provision of the Games and the Website that
                            enable you to Participate.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span> 1.14.</span> Terms and Conditions means these
                            terms and conditions, as amended from time to time.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span> 1.15.</span> Third Party Websites means a
                            third party website not controlled by us.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span> 1.16.</span> PlayBrainz Games means any game
                            played.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span> 1.17.</span> PlayBrainz, We, we, Us, Our or
                            our means PlayBrainz
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span> 1.18.</span> Website means the website
                            located at https://PlayBrainz.com, any other related
                            sites operated by Us and all subdomains, subpages
                            and successor sites thereof.
                          </p>
                          <h1 className="font-inter font-normal text-lg mb-5 mt-8 uppercase">
                            2. YOUR PARTICIPATION
                          </h1>
                          <p className="text-base font-inter font-normal mb-4">
                            Restrictions
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            You hereby declare and warrant that:
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>2.0.0.</span> You are over 18 years of age or
                            such higher minimum legal age of majority as
                            stipulated in the jurisdiction of your residence and
                            are, under the laws applicable to you, legally
                            allowed to participate in the Games offered on the
                            Platform. If you are not 18 years or older You may
                            not access the Service;
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>2.0.1.</span>You participate in the Games
                            strictly in your personal capacity for recreational
                            and entertainment purposes only;
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>2.0.2.</span>You participate in the Games on
                            your own behalf and not on the behalf of any other
                            person;
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>2.0.3.</span>All information that You provide
                            to Us during the term of validity of these Terms and
                            Conditions is true, complete and correct, and You
                            will immediately notify Us of any change to such
                            information;
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>2.0.4.</span>Money that You use to play
                            PlayBrainz games is not tainted with any illegality
                            and, in particular, does not originate from any
                            illegal activity or source;
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>2.0.5.</span>You will not play PlayBrainz
                            games from a business or corporate account, but only
                            from an account held in your name;
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>2.0.6.</span>You will not be involved in any
                            fraudulent, collusive, fixing or other unlawful
                            activity in relation to your or third parties’
                            participation in any of the Games and you will not
                            use any software-assisted methods or techniques
                            (including but not limited to bots designed to play
                            automatically) or hardware devices for your
                            participation in any of the Games. We reserve the
                            right to invalidate any participation in the event
                            of such behaviour; and
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>2.1.</span>It is a Player’s responsibility to
                            ensure that their Participation is lawful in their
                            jurisdiction. Any person who is knowingly in breach
                            of clause 2., including any attempt to circumvent
                            this restriction, for example, by using a VPN, proxy
                            or similar service that masks or manipulates the
                            identification of your real location, or by
                            otherwise providing false or misleading information
                            regarding your location or place of residence, or by
                            Participating through a third party or on behalf of
                            a third party located in a jurisdiction where it is
                            unlawful to Participate, is in breach of these Terms
                            and Conditions. You may be committing fraud and may
                            be subject to criminal prosecution.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>2.2.</span>Employees of PlayBrainz, any of
                            their respective affiliates, subsidiaries, parent or
                            holding companies, advertising agencies, or any
                            other company or individual involved with the
                            design, production, execution or distribution of the
                            Games and their immediate family (spouse, parents,
                            siblings and children, whether the relationship is
                            by birth, marriage or adoption) and household
                            members (people who share the same residence at
                            least 6 months of the year) are not eligible to
                            Participate.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>2.3.</span>Players who have excluded
                            themselves from participation are prohibited from
                            participation in games of chance as long as the
                            self-exclusion period is in place.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>2.4.</span>By accepting these Terms and
                            Conditions You agree that your Participation is at
                            your sole option, discretion, and risk. You will
                            have no claims whatsoever against PlayBrainz or any
                            of its partners, or respective directors, officers
                            or employees in relation to any losses You incur.
                          </p>
                          <h1 className="font-inter font-normal text-lg mb-5 mt-8 uppercase">
                            3. LICENCE
                          </h1>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>3.0.</span>Subject to your agreement and
                            continuing compliance with these Terms and
                            Conditions, PlayBrainz grants You a personal,
                            non-exclusive, non-transferable, non-sublicensable,
                            revocable, limited licence to access and use the
                            Platform, through a supported Web browser or mobile
                            device, solely for your personal, private
                            entertainment and no other reason.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>3.1.</span>These Terms and Conditions do not
                            grant You any right, title or interest in the
                            Platform or Content.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>3.2.</span>You acknowledge and agree that your
                            licence to use the Platform is limited by these
                            Terms and Conditions and if you do not agree to, or
                            act in contravention of, these Terms and Conditions,
                            your licence to use the Platform (including the
                            Games and Content) may be immediately terminated.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>3.3.</span>Where the Platform or any Game is
                            deemed to be illegal under the laws of the
                            jurisdiction in which you reside or are situated,
                            you will not be granted any licence to, and must
                            refrain from accessing, the Platform or relevant
                            Game.
                          </p>
                          <h1 className="font-inter font-normal text-lg mb-5 mt-8 uppercase">
                            4. YOUR CUSTOMER ACCOUNT
                          </h1>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>4.0.1.</span>Our system allows for customer
                            account per wallet address, including any Inactive
                            Accounts, on the Platform.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>4.1.</span>You are required to always keep
                            your registration details up to date. If you update
                            any of your personal information, contact Customer
                            Support via Discord-Arena and open a ticket in order
                            to update your details. If provided, the name that
                            you used at registration must be identical to that
                            listed on your government issued identification.
                            Please note that any changes to your personal
                            details may result in you having to submit
                            identification in order to verify your identity.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>4.2.</span>Security and Responsibility of Your
                            Customer Account
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            As part of the registration process, you will have
                            to choose a password to login into the Platform, if
                            offered, you may login to your Customer Account
                            using MetaMask. It is your sole and exclusive
                            responsibility to ensure that your Customer Account
                            login details and any payment methods are kept
                            secure and are only accessible by you. You accept
                            full responsibility for any unauthorised use of your
                            Customer Account and any activity linked to your
                            Customer Account, including by a minor (which in all
                            events is prohibited).
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>4.2.0.</span>You must not share your Customer
                            Account or seed phrase with another person, let
                            anyone else access or use your Customer Account or
                            do any other thing that may jeopardise the security
                            of your Customer Account.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>4.2.1.</span>If you become aware of, or
                            reasonably suspect that security in your Customer
                            Account has been compromised, including loss, theft
                            or unauthorised disclosure of your password and
                            Customer Account details, you must notify us
                            immediately.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>4.2.2.</span>You are solely responsible for
                            maintaining the confidentiality of your password and
                            you will be held responsible for all uses of your
                            Customer Account, including any purchases made under
                            the Customer Account, whether those purchases were
                            authorised by you or not.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>4.2.3.</span>You are solely responsible for
                            anything that happens through your Customer Account,
                            whether or not you undertook those actions. You
                            acknowledge that your Customer Account may be
                            terminated if someone else uses it and engages in
                            any activity that breaches these Terms and
                            Conditions or is otherwise illegal.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>4.2.4.</span>We are not responsible for any
                            abuse or misuse of your Customer Account by third
                            parties due to your disclosure of your login details
                            to any third party, whether such disclosure is
                            intentional or accidental, active or passive.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>4.3.</span>Account Transfers
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            You are not allowed to transfer any existing balance
                            between Customer Accounts, or from your Customer
                            Account to other users, or to receive balance from
                            other Customer Accounts into your Customer Account,
                            or to transfer, sell and/or acquire Customer
                            Accounts.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>4.4.</span>Inactive Customer Accounts
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            We reserve the right to deactivate your Customer
                            Account if it is deemed to be an Inactive Account.
                            If no transactions have been recorded on your
                            Customer Account for 12 consecutive months, we
                            reserve the right to zero any balance with no offer
                            of any purchase refunds.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>4.5.</span>Closing of Customer Accounts
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            If you wish to close your Customer Account, you may
                            do so at any time by selecting the “Contact” link on
                            the Platform and submitting a request to close your
                            Customer Account. Closing your Customer Account will
                            forfeit all continued access to and right to use.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>4.5.0.</span>You will be able to open your
                            Customer Account again by sending a request to the
                            Customer Support team. All requests for the
                            re-opening of an account will be evaluated by our
                            Customer Support and Compliance teams, which shall
                            abide by strict customer protection guidelines.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>4.5.1</span>PlayBrainz will not be held
                            responsible for any losses or damages which occurred
                            as a result of circumventing our closed account
                            program. Losses during this period will not be
                            refunded.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>4.6.</span>Discretion to Refuse or Close
                            Accounts
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            We reserve the right to refuse a Customer Account to
                            anyone, or to close an already open Customer Account
                            in our sole discretion. In the event We choose to
                            close an account, depending on reasoning, any
                            existing balance may be refunded prior to the
                            closure. This is again at our sole discretion.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>4.7.</span>Our website offers you the
                            possibility of a voluntary self-exclusion. Please
                            see the Self-Exclusion Policy for further
                            information.
                          </p>
                          <h1 className="font-inter font-normal text-lg mb-5 mt-8 uppercase">
                            5. GAMES
                          </h1>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.</span>Rules
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.0.</span>Games offered on the Platform may
                            have their own rules which are available on the
                            Platform. It is your responsibility to read the
                            rules of a Game before playing. You must familiarise
                            yourself with the applicable terms of play and read
                            the relevant rules before playing any Game.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.1.</span>All crypto exchange transaction
                            fees, charges or related costs that may be incurred
                            as a result of, or in relation to, your balance
                            funding are to be borne solely by you, including but
                            not limited to any losses or additional costs
                            arising from cryptocurrency exchange fluctuations.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.2.</span>You may participate in any Game
                            only if you have sufficient balance in your Customer
                            Account for such Participation. We will not extend
                            you any credit whatsoever.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.3.</span>From time to time, we may assign
                            minimum or maximum purchases as specified and
                            offered on the Platform.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.4.</span>Once a purchase has been made,
                            the funds will be drawn from your MetaMask account
                            as soon as practicable.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.6.</span>Funds that have been submitted
                            for play and accepted cannot be changed, withdrawn,
                            or cancelled and the balance will be drawn
                            instantly.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.7.</span>Void Games
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            We reserve the right to declare Participation in a
                            Game void, partially or in full, if, in our sole
                            discretion, we deem it obvious that there was an
                            error, mistake, misprint or technical error, fraud,
                            or other action invalidating play.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.8.</span>Final Decision
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            In the event of a discrepancy between the result
                            showing on a user’s device and the PlayBrainz server
                            software, the result showing on the PlayBrainz
                            server software will be the official and governing
                            result.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.8.1.</span>While every effort is made to
                            ensure the accuracy of the Return to Player
                            percentages (RTPs) displayed on our website, you can
                            always verify the current theoretical RTP of the
                            slot you’re playing from within its in-game menu.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.8.2.</span>We will retain all
                            communication related to participation in games for
                            as long as you use our Services or as necessary to
                            fulfill the purpose(s) for which it was collected,
                            provide our Services, resolve disputes, establish
                            legal defenses, conduct audits, pursue legitimate
                            business purposes, enforce our agreements, and
                            comply with applicable laws.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.8.3.</span>The following cryptocurrencies
                            can be used for making deposits: ETH, BTC, SOL,
                            USDC, USDT, DAI, LTC, DOGE, MATIC, BNB, BCH, XRP,
                            TRON and EOS. The value of bets placed and prizes
                            won using any of the cryptocurrencies listed above
                            on the website will be displayed in USD.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.9.</span>Competitions
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            Competitions offered on the platform may have their
                            own entry requirements. It is your responsibility to
                            read the entry requirements and cost prior to
                            entering.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.10.</span>Competitions operate using
                            verified WEB3 compliant smart contracts.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.10.</span>Competitions are hosted within
                            the smart contract and offer full visibility to the
                            participants, as such, entries can only be made via
                            a direct wallet transaction.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.11.</span>Entries to competitions will
                            carry an ethereum blockchain ‘gas fee’. Gas fees are
                            a standard when operating on the Ethereum
                            blockchain.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.14.</span>Competition entries once
                            purchased will not be refunded.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.15.</span>We may implement limitations on
                            the amount of entry packages or total entries a
                            single account can buy.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.16.</span>A list of all participants can
                            be found on the competition page and within the
                            smart contract for each competition.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.17.</span>In the unlikely event of a
                            cancellation, participants can claim their entry
                            cost back from their profile page.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.18.</span>In the unlikely event of a
                            competition cancellation, all unclaimed funds will
                            be transferred to a PlayBrainz wallet after 30 days.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.19.</span>Failed entries and funds lost as
                            a result of adjusting the recommended gas
                            estimations are not the responsibility of
                            PlayBrainz.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.20.</span>Competitions with max entries
                            showing will remove entry buttons from the website
                            when the max entry number has been reached. It is
                            possible some further entries reach us after the
                            competition closes by way of delayed receipts.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.21.</span>Any evidence of attempts to
                            manipulate the mechanics of PlayBrainz Competitions
                            discovered may result in the removal from the
                            Competition draw and a closure of your PlayBrainz
                            account. This includes but not limited to
                            hotswapping an NFT to access 'Holders Only' games.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.22.</span>Some competitions will display
                            an entrants cap. This max cap is strictly an
                            approximation. When this cap is reached, the UI
                            closes and a call to draw the competition is sent
                            via the blockchain and is subject to blockchain
                            processing times. Any additional entries processed
                            prior to the draw call completing may be included in
                            the final draw.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.23.</span>If you suspect another user of
                            suspicious activity please open a ticket in Discord
                            - Arena.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.24.</span>PlayBrainz reserves the right to
                            amend Competition end times.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.25.</span>Competition max entries are on
                            an account basis.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.26.</span>Competitions may periodically
                            include minimum entry requirements that if not
                            reached will extend the draw time. Commonly referred
                            to as Overtime, these Competitions will state in the
                            description. More details can be found on the ARENA
                            Discord.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.0.27.</span>Holders Only Competitions will
                            allow 1 entry per allowed token ID. Once the token
                            as been used for an entry, it cannot be used to
                            entry again using a different wallet.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.1.3.</span>Users can obtain one entry per
                            competition by completing the mail in registration
                            process. The entry will be added to the draw in the
                            final hour before the competition completes.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>5.1.4.</span>We shall not be responsible for
                            late, lost, illegible, incomplete, stolen,
                            misdirected, mutilated or postage-due mail. The odds
                            of winning any Prize will be the same for Mail-In
                            Members as for Paying Members. All Mail-In Members
                            will be accorded equal opportunities to participate
                            and win in Games held on the Platform.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>6.</span>Swapping ETH into your PlayBrainz
                            balance
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>6.0.</span>You can participate in any or
                            PlayBrainz’s instant games if you have sufficient
                            ETH in your PlayBrainz balance. PlayBrainz will not
                            give you any credit whatsoever for participation in
                            any of its instant games. balance
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>6.1.</span>Swapping ETH into your PlayBrainz
                            balance may be restricted in certain territories. If
                            you do not see the option to swap, then you are
                            within a territory in which they are not accepted.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>6.2.</span>To swap funds into your PlayBrainz
                            wallet, you transfer funds from crypto-wallets using
                            the swap option within your PlayBrainz wallet. Swaps
                            can only be made with the wallet connected to your
                            PlayBrainz account.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>6.3.</span>Swaps into your PlayBrainz balance
                            are shown in your PlayBrainz wallet instantly.
                            PlayBrainz does not take responsibility for any
                            delays caused due to Ethereum network confirmation
                            times or due to delays caused by any third party.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>6.4.</span>We reserve the right to use
                            additional procedures and means to verify your
                            swaps.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>6.5.</span>Note that gas fees are applied to a
                            swap into your PlayBrainz balance, as displayed by
                            your crypto wallet on confirmation.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>6.6.</span>Your PlayBrainz balance cannot be
                            transferred from your PlayBrainz wallet to the
                            PlayBrainz wallet of another user.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>6.7.</span>PlayBrainz can refuse any swaps at
                            its own discretion. Users that have their accounts
                            blocked, or suspended shall refrain from swapping.
                            In the event that a user attempts to swap when their
                            PlayBrainz account is closed or suspended,
                            PlayBrainz has the right to retain the funds.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>7.</span>Swapping ETH out of your PlayBrainz
                            balance
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>7.0.</span>Swaps out of your PlayBrainz
                            balance will be made to the crypto wallet you have
                            associated with your PlayBrainz account.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>7.1.</span>PlayBrainz reserves the right to
                            carry out additional verification procedures for any
                            outbound swap.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>7.2.</span>PlayBrainz users who wish to
                            recover funds held in closed or suspended accounts,
                            must open a ticket in Discord - Arena with their
                            request.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>7.3.</span>PlayBrainz may suspend, or close a
                            users PlayBrainz account and withhold funds at any
                            point.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>7.4.</span>You acknowledge that the balance in
                            your PlayBrainz wallet is used instantly when
                            interacting with our instant games and we do not
                            provide return of goods, refunds.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>7.5.</span>Note that withdrawals include an
                            additional 0.005 ETH fee to cover transactional gas.
                          </p>
                          <h1 className="font-inter font-normal text-lg mb-5 mt-8 uppercase">
                            8. PROMOTIONS
                          </h1>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>8.0.</span>All promotions, including contests
                            and special offers are subject to these Terms and
                            Conditions and to additional terms that may be
                            published at the time of the promotion.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>8.1.</span>In the event and to the extent of
                            any conflict between these Terms and Conditions and
                            any promotion-specific terms and conditions, the
                            promotion-specific terms and conditions will
                            prevail.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>8.2.</span>PlayBrainz reserves the right to
                            withdraw or modify such promotions without prior
                            notice to you.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>8.3.</span>If, in the reasonable opinion of
                            PlayBrainz, we form the view that a Registered
                            Customer is abusing any promotion, to derive any
                            advantage or gain for themselves or other Registered
                            Customers, including by way of Fraudulent Conduct,
                            we may, at our sole discretion, withhold, deny or
                            cancel any advantage, bonus or prize as we see fit.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>8.4.</span>Without limiting clause 9.3.,
                            unless restricted by applicable law, you confirm
                            that you grant PlayBrainz an irrevocable, perpetual,
                            worldwide, non-exclusive, royalty-free licence to
                            use in whatever way we see fit, and without further
                            acknowledgement of you as the author, any Content
                            you post or publish as part of a promotion, contest
                            or competition.
                          </p>
                          <h1 className="font-inter font-normal text-lg mb-5 mt-8 uppercase">
                            9. FINANCIAL TERMS OF USE
                          </h1>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>9.0.</span>Verification Checks
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>9.0.0.</span>You agree that we are entitled to
                            conduct any identification, credit and other
                            verification checks that we may reasonably require
                            and/or that are required of us under applicable laws
                            and regulations or by relevant regulatory
                            authorities.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>9.0.1.</span>Until all required verification
                            checks are completed to our satisfaction, we are
                            entitled to restrict your Customer Account in any
                            manner that we may reasonably deem appropriate,
                            including by suspending or deactivating your
                            Customer Account.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>9.0.2.</span>Where any identification, credit
                            or other verification check we require cannot be
                            completed to our satisfaction because you have not
                            provided any document we request from You in the
                            form that we require within 7 days’ of the date the
                            document was first requested, we will deactivate
                            your Customer Account. You will not be able to swap
                            funds into your balance at PlayBrainz until this
                            verification check has been successfully
                            completed.Credit Checks
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>9.0.3.</span>PlayBrainz reserves the right to
                            run external verification checks on all account
                            holders with third party verification agencies based
                            on the information provided on registration.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>9.1.</span>Expiry and Forfeiture
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>9.1.0.</span>Your PlayBrainz balance is valid
                            for 365 days from the date you last logged on to
                            your Customer Account and will thereafter
                            automatically expire.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>9.1.1.</span>Your PlayBrainz balance may be
                            forfeited if a Customer Account is deactivated for
                            any reason, or at our discretion.
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>9.2.</span>Mistaken Credits
                          </p>

                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            If we mistakenly credit your Customer Account with
                            additional funds or prizes that do not belong to
                            you, whether due to a technical error, human error
                            or otherwise, the amount credited will remain the
                            property of PlayBrainz and will be deducted from
                            your Customer Account at the earliest opportunity.
                          </p>
                          <h1 className="font-inter font-normal text-lg mb-5 mt-8 uppercase">
                            10. FRAUDULENT CONDUCT
                          </h1>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>10.0.</span>You may not, directly or
                            indirectly:
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>10.0.0.</span>Hack into any part of the Games
                            or Platform through password mining, phishing, or
                            any other means;
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>10.0.1.</span>Attempt to modify, reverse
                            engineer, or reverse-assemble any part of the Games
                            or Platform;
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>10.0.2.</span>Knowingly introduce viruses,
                            Trojans, worms, logic bombs, spyware, malware, or
                            other similar material;
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>10.0.3.</span>Circumvent the structure,
                            presentation or navigational function of any Game so
                            as to obtain information that is not publicly
                            available on the Platform;
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>10.0.4.</span>Engage in any form of cheating
                            or collusion;
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>10.0.5.</span>Use the Services and the systems
                            of PlayBrainz to facilitate any type of illegal
                            money transfer (including money laundering proceeds
                            of crime); or
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>10.0.6.</span>Participate in or take advantage
                            of, or encourage others to participate in or take
                            advantage of schemes, organisations, agreements, or
                            groups designed to share:
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>10.0.6.0.</span>Special offers or packages
                            emailed to a specific set of players and redeemable
                            by URL; or
                          </p>
                          <p className="flex flex-nowrap gap-1.5 text-base font-inter font-normal mb-4">
                            <span>10.0.6.1.</span>Identification documents
                            (including, but not limited to, photographs, bills
                            and lease documents) for the purpose of misleading
                            PlayBrainz as to a Player’s identity.
                          </p>
                        </ul>
                      </div>
                    </div>
                    <form onSubmit={handleContinue}>
                      <div class="bg-primary-400 pl-4 pr-[36px] py-6 w-full mt-4 rounded-[10px]">
                        <div className=" relative flex items-center">
                          <CustomCheckbox
                            checked={checkedOne}
                            setChecked={setCheckedOne}
                          />
                          <div className="ml-[16px]">
                            <p className="font-inter font-normal text-start">
                              You agree to our Terms of Use and License Terms.
                              In our Privacy Policy, we explain how we process
                              your personal data and what rights you have.
                            </p>
                          </div>
                        </div>
                        {/* <div className="relative flex items-center mt-9">
                          <CustomCheckbox
                            checked={checkedTwo}
                            setChecked={setCheckedTwo}
                          />
                          <div className="ml-[16px]">
                            <p className="font-inter font-normal text-start">
                              You agree to our Terms of Use and License Terms.
                              In our Privacy Policy, we explain how we process
                              your personal data and what rights you have.
                            </p>
                          </div>
                        </div> */}
                      </div>
                      <div className="pt-[40px] pb-[14px]">
                        <Button
                          type="submit"
                          variant={"outlined"}
                          size="text-xl"
                        >
                          Continue
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="absolute top-[38px] right-[50px] "
                >
                  <ModalCrossIcon
                    className={"text-white hover:text-secondary cursor-pointer"}
                  />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConditionsModal;
