export default function SettingButton() {
    return (
        <div data-layer="settings" className="Settings w-[70.50px] h-[70.50px] top-[16px] right-[16px] relative">
            <div data-layer="Ellipse 14" className="Ellipse14 w-[70.50px] h-[70.50px] left-0 top-0 absolute bg-[#c8dfef] rounded-full" />
                <img
                    src="../setting-button.svg"
                    // className="fixed opacity-100 z-10 bottom-0"
                    className="relative"
                    alt="Header Text"
                />
        </div>
    );
}
