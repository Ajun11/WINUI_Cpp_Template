#include "pch.h"
#include "MainWindow.xaml.h"
#if __has_include("MainWindow.g.cpp")
#include "MainWindow.g.cpp"
#include <string>
#include <winrt/Windows.UI.Xaml.Interop.h> //For using xaml_typename
#include "microsoft.ui.xaml.window.h"
#endif
using namespace std;
using namespace winrt;
using namespace Microsoft::UI::Xaml;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace winrt::ControlSystem::implementation
{
    MainWindow::MainWindow()
    {
        InitializeComponent();
        m_micadrop.Kind(winrt::Microsoft::UI::Composition::SystemBackdrops::MicaKind::Base);
        SystemBackdrop(m_micadrop);
        Window m_window = *this;
        m_window.ExtendsContentIntoTitleBar(true);
        HWND hwnd = GetWindowHandle();
        SetWindowSize(hwnd,1500, 700);
        PlacementCenterWindowInMonitorWin32(hwnd);
    }
    HWND MainWindow::GetWindowHandle()
    {
        if (_hwnd == nullptr)
        {
            Window window = *this;
            window.as<IWindowNative>()->get_WindowHandle(&_hwnd);
        }
        return _hwnd;
    }
    void MainWindow::LoadIcon(HWND hwnd, wchar_t const* iconName)
    {
        HANDLE hSamllIcon = LoadImageW(nullptr, iconName, IMAGE_ICON,
            GetSystemMetrics(SM_CXSMICON), GetSystemMetrics(SM_CYSMICON),
            LR_LOADFROMFILE | LR_SHARED);
        SendMessageW(hwnd, WM_SETICON, ICON_SMALL, reinterpret_cast<LPARAM>(hSamllIcon));
        HANDLE hBigIcon = LoadImageW(nullptr, iconName, IMAGE_ICON,
            GetSystemMetrics(SM_CXICON), GetSystemMetrics(SM_CYICON),
            LR_LOADFROMFILE | LR_SHARED);
        SendMessageW(hwnd, WM_SETICON, ICON_BIG, reinterpret_cast<LPARAM>(hBigIcon));
    }
    void MainWindow::SetWindowSize(HWND hwnd, int width, int height)
    {
        const UINT dpi = GetDpiForWindow(hwnd);
        const float scalingFactor = static_cast<float>(dpi) / 96;
        const int widthScaled = static_cast<int>(width * scalingFactor);
        const int heightScaled = static_cast<int>(height * scalingFactor);
        SetWindowPos(hwnd, nullptr, 0, 0, widthScaled, heightScaled, SWP_NOMOVE | SWP_NOZORDER);
    }
    void MainWindow::PlacementCenterWindowInMonitorWin32(HWND hwnd)
    {
        RECT windowMonitorRectToAdjust;
        GetWindowRect(hwnd, &windowMonitorRectToAdjust);
        ClipOrCenterRectToMonitorWin32(windowMonitorRectToAdjust);
        SetWindowPos(hwnd, nullptr, windowMonitorRectToAdjust.left,
            windowMonitorRectToAdjust.top, 0, 0, SWP_NOSIZE | SWP_NOZORDER | SWP_NOACTIVATE);
    }
    void MainWindow::ClipOrCenterRectToMonitorWin32(RECT& adjustedWindowRect)
    {
        MONITORINFO mi{ sizeof(mi) };
        GetMonitorInfoW(MonitorFromRect(&adjustedWindowRect, MONITOR_DEFAULTTONEAREST), &mi);

        const auto& rcWork = mi.rcWork;
        const int w = adjustedWindowRect.right - adjustedWindowRect.left;
        const int h = adjustedWindowRect.bottom - adjustedWindowRect.top;

        adjustedWindowRect.left = rcWork.left + (rcWork.right - rcWork.left - w) / 2;
        adjustedWindowRect.top = rcWork.top + (rcWork.bottom - rcWork.top - h) / 2;
        adjustedWindowRect.right = adjustedWindowRect.left + w;
        adjustedWindowRect.bottom = adjustedWindowRect.top + h;
    }

}


