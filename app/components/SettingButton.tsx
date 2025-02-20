export default function SettingButton() {
    return (
        <div
            data-layer="settings"
            className="Settings w-[60px] h-[60px] top-[16px] right-[16px] relative flex items-center justify-center"
        >
            {/* Lingkaran emas */}
            <div className="Ellipse14 w-[60px] h-[60px] bg-[#E70012] rounded-full flex items-center justify-center">
                {/* Ikon SVG di tengah */}
                <img
                    src="../setting-button.svg"
                    className="w-8 h-8"
                    alt="Settings Icon"
                />
            </div>
        </div>
    );
}
