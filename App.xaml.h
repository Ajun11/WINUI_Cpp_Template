#pragma once

#include "App.xaml.g.h"
#include "MainPage.xaml.h"
namespace winrt::ControlSystem::implementation
{
    struct App : AppT<App>
    {
        App();
        void OnLaunched(Microsoft::UI::Xaml::LaunchActivatedEventArgs const&);
        //* After add
        void OnWindowClosed(winrt::Windows::Foundation::IInspectable const& sender, Microsoft::UI::Xaml::WindowEventArgs const& args);
        //* static inline can be defined by nullptr
        static inline Microsoft::UI::Xaml::Controls::WebView2 m_appwebview_page3{ nullptr };
        static inline Microsoft::UI::Xaml::Controls::WebView2 m_appwebview_page2{ nullptr };
        static inline bool Webview2_Page3_Initializing = false;
        static inline bool Webview2_Page2_Initializing = false;
    private:
        winrt::Microsoft::UI::Xaml::Window window{ nullptr };
        //* After add
        Microsoft::UI::Xaml::Window::Closed_revoker m_WindowClosed_revoker{};
    };
}
