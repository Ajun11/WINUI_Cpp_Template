#pragma once

#include "MainWindow.g.h"

namespace winrt::ControlSystem::implementation
{
    struct MainWindow : MainWindowT<MainWindow>
    {
        MainWindow();
        HWND _hwnd{ nullptr };
        HWND MainWindow::GetWindowHandle();
        void MainWindow::SetWindowSize(HWND hwnd, int width, int height);
        void MainWindow::LoadIcon(HWND hwnd, wchar_t const* iconName);
        void MainWindow::PlacementCenterWindowInMonitorWin32(HWND hwnd);
        void MainWindow::ClipOrCenterRectToMonitorWin32(RECT& adjustedWindowRect);
    private:
        Microsoft::UI::Xaml::Media::MicaBackdrop m_micadrop;
     
    };
}

namespace winrt::ControlSystem::factory_implementation
{
    struct MainWindow : MainWindowT<MainWindow, implementation::MainWindow>
    {
    };
}
