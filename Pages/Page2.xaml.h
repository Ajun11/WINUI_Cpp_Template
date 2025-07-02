#pragma once

#include "Page2.g.h"
#include "App.xaml.h"
namespace winrt::ControlSystem::implementation
{
    struct Page2 : Page2T<Page2>
    {
        Page2();
        friend struct winrt::ControlSystem::implementation::App;
        void RegisterEvents();
        void WebView_Initialize();
        void Start_Simulaion_Button_Clicked(winrt::Windows::Foundation::IInspectable const& sender, winrt::Microsoft::UI::Xaml::RoutedEventArgs const& e);
        Microsoft::UI::Xaml::Controls::WebView2 m_webview{ nullptr };
    private:
        //* For Webview_Used
        void OnNavigationStarting(winrt::Microsoft::UI::Xaml::Controls::WebView2 const& sender, winrt::Microsoft::Web::WebView2::Core::CoreWebView2NavigationStartingEventArgs const& args);
        void OnNavigationCompleted(winrt::Microsoft::UI::Xaml::Controls::WebView2 const& sender, winrt::Microsoft::Web::WebView2::Core::CoreWebView2NavigationCompletedEventArgs const& args);
        void OnDownloadStarting(Microsoft::Web::WebView2::Core::CoreWebView2 const& sender, Microsoft::Web::WebView2::Core::CoreWebView2DownloadStartingEventArgs const& args);
        void OnDwonloadStateChanged(winrt::Microsoft::Web::WebView2::Core::CoreWebView2DownloadOperation const& sender, winrt::Windows::Foundation::IInspectable const& args);
        Microsoft::UI::Xaml::Controls::WebView2::NavigationStarting_revoker m_NavigationStarting_revoker{};
        Microsoft::UI::Xaml::Controls::WebView2::NavigationCompleted_revoker m_NavigationCompleted_revoker{};
        //* Judge Whether File download or not, close the defalut download prompt, should use icorewebview, no corewebview!
        //* ×¢ÒâÒªÓÃicore°¡
        Microsoft::Web::WebView2::Core::CoreWebView2::DownloadStarting_revoker m_DownloadStarting_revoker{};
        Microsoft::Web::WebView2::Core::ICoreWebView2DownloadOperation m_ICoreWebView2DownloadOperation{};
        Microsoft::Web::WebView2::Core::ICoreWebView2DownloadOperation::StateChanged_revoker m_DownloadStateChanged_revoker{};
     
        hstring m_webview_file_download_path;
        
    };
}

namespace winrt::ControlSystem::factory_implementation
{
    struct Page2 : Page2T<Page2, implementation::Page2>
    {
    };
}
