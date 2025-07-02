#include "pch.h"
#include "Page3.xaml.h"
#if __has_include("Page3.g.cpp")
#include "Page3.g.cpp"
#include <winrt/Microsoft.Web.WebView2.Core.h>
#include <winrt/Microsoft.UI.Xaml.Controls.h>
#include <winrt/Windows.UI.Xaml.Controls.h>
#include "microsoft.ui.xaml.window.h"
#include <filesystem>
#include <string>
#include "Control_moudle\SimulationMultiThreading.h"
#endif

using namespace winrt;
using namespace Microsoft::UI::Xaml;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace winrt::ControlSystem::implementation
{
    Page3::Page3()
    {
        InitializeComponent();
        WebView_Initialize();
        RegisterEvents();
    }
    void Page3::WebView_Initialize()
    {
        std::filesystem::path nowpath = std::filesystem::current_path();
        std::string stringpath = nowpath.generic_string();
        std::string uristr = "file:///" + stringpath + "/Assets/index.html";
        // Mytext().Text(winrt::to_hstring(stringpath));
        //hstring path = L"file:///D:/Visualstudio/repo/Webview2APP_Test/WebView2App/WebView2App/Assets/index.html";
        hstring path = L"file:///D:/Visualstudio/repo/WINUI_3Template/Assets/JsAssets/HighChartsFor_WebView2_Using_RealTime/HighChartsFor_WebView2_Using_RealTime.html";
        std::wstring uriToLaunch{ path };
        Windows::Foundation::Uri uri{ uriToLaunch };
        m_webview = MyWebView2();
        m_webview.Source(uri);
        //* achieve close
        winrt::ControlSystem::implementation::App::m_appwebview_page2 = m_webview;
        winrt::ControlSystem::implementation::App::Webview2_Page2_Initializing = true;
    }
    void Page3::RegisterEvents()
    {
        m_NavigationStarting_revoker = m_webview.NavigationStarting(winrt::auto_revoke, [ref = get_weak()](auto const& sender, auto const& args) {
            if (auto self = ref.get()) {
                self->OnNavigationStarting(sender, args);
            }
            });
        m_NavigationCompleted_revoker = m_webview.NavigationCompleted(winrt::auto_revoke, [ref = get_weak()](auto const& sender, auto const& args) {
            if (auto self = ref.get())
            {
                self->OnNavigationCompleted(sender, args);
            }
            });
    }
    void Page3::OnNavigationStarting(winrt::Microsoft::UI::Xaml::Controls::WebView2 const& sender, winrt::Microsoft::Web::WebView2::Core::CoreWebView2NavigationStartingEventArgs const& args)
    {
    }
    void Page3::OnNavigationCompleted(winrt::Microsoft::UI::Xaml::Controls::WebView2 const& sender, winrt::Microsoft::Web::WebView2::Core::CoreWebView2NavigationCompletedEventArgs const& args)
    {
        m_DownloadStarting_revoker = m_webview.CoreWebView2().DownloadStarting(winrt::auto_revoke, [ref = get_weak()](auto const& sender, auto const& args) {
            if (auto self = ref.get())
            {
                self->OnDownloadStarting(sender, args);
            }
            });
    }
    void Page3::OnDownloadStarting(Microsoft::Web::WebView2::Core::CoreWebView2 const& sender, Microsoft::Web::WebView2::Core::CoreWebView2DownloadStartingEventArgs const& args)
    {
        //* 取消默认弹窗
        args.Handled(true);
        //* 复制网页操作事件,这样事件才能一直存活，不然这个函数销毁变量找不到，就没办法触发
        m_ICoreWebView2DownloadOperation = args.DownloadOperation();
        m_webview_file_download_path = args.ResultFilePath();
        m_DownloadStateChanged_revoker = m_ICoreWebView2DownloadOperation.StateChanged(winrt::auto_revoke, [ref = get_weak()](auto const& sender, auto const& args) {
            if (auto self = ref.get())
            {
                self->OnDwonloadStateChanged(sender, args);
            }
            });
    }
    void Page3::OnDwonloadStateChanged(winrt::Microsoft::Web::WebView2::Core::CoreWebView2DownloadOperation const& sender, winrt::Windows::Foundation::IInspectable const& args)
    {
        if (sender.State() == Microsoft::Web::WebView2::Core::CoreWebView2DownloadState::Completed)
        {
            InformationBar().Severity(Microsoft::UI::Xaml::Controls::InfoBarSeverity::Success);
            InformationBar().Title(L"下载提示");
            InformationBar().Message(L"File Download into:" + m_webview_file_download_path);
            InformationBar().IsOpen(true);
        }
    }
    void Page3::Start_Simulaion_Button_Clicked(winrt::Windows::Foundation::IInspectable const& sender, winrt::Microsoft::UI::Xaml::RoutedEventArgs const& e)
    {
        //auto toggle_button;
        float sample_time = 0.5;
        float reference_vel = simulation_ref_vel;
        if (Simulation_toggle_button().IsOn()==true)
        {
            if (!winrt::ControlSystem::implementation::SimulationMultiThreading::is_running)
            {
                winrt::ControlSystem::implementation::SimulationMultiThreading::is_running = true;
                std::thread th1(&winrt::ControlSystem::implementation::SimulationMultiThreading::ControlSimulation, sample_time, reference_vel, m_webview);
                th1.detach();
            }
            Mytext().Text(to_hstring(winrt::ControlSystem::implementation::SimulationMultiThreading::is_running));
        }
        else
        {
            winrt::ControlSystem::implementation::SimulationMultiThreading::is_running = false;
            Mytext().Text(to_hstring(winrt::ControlSystem::implementation::SimulationMultiThreading::is_running));
        }
    }
}
