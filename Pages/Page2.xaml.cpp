#include "pch.h"
#include "Page2.xaml.h"
#if __has_include("Page2.g.cpp")
#include "Page2.g.cpp"
//* XAML typwe header
#include <winrt/Windows.UI.Xaml.Interop.h>
//* Animation header
#include <winrt/Microsoft.UI.Xaml.Media.Animation.h>
#include <winrt/Microsoft.Web.WebView2.Core.h>
#include <winrt/Microsoft.UI.Xaml.Controls.h>
#include <winrt/Windows.UI.Xaml.Controls.h>
#include "microsoft.ui.xaml.window.h"
#include <filesystem>
#include <string>
#include "Control_moudle\Simulation.h"
#endif

using namespace winrt;
using namespace Microsoft::UI::Xaml;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace winrt::ControlSystem::implementation
{
    Page2::Page2()
    {
        InitializeComponent();
        WebView_Initialize();
        RegisterEvents();
    }
    void Page2::WebView_Initialize()
    {
        std::filesystem::path nowpath = std::filesystem::current_path();
        std::string stringpath = nowpath.generic_string();
        std::string uristr = "file:///" + stringpath + "/Assets/index.html";
        // Mytext().Text(winrt::to_hstring(stringpath));
        //hstring path = L"file:///D:/Visualstudio/repo/Webview2APP_Test/WebView2App/WebView2App/Assets/index.html";
        hstring path = L"file:///D:/Visualstudio/repo/WINUI_3Template/Assets/JsAssets/HighChartsFor_WebView2_Using_Fixed/HighChartsFor_WebView2_Using_Fixed.html";
        std::wstring uriToLaunch{ path };
        Windows::Foundation::Uri uri{ uriToLaunch };
        m_webview = MyWebView2();
        m_webview.Source(uri);
        //* achieve close
        winrt::ControlSystem::implementation::App::m_appwebview_page2 = m_webview;
        winrt::ControlSystem::implementation::App::Webview2_Page2_Initializing = true;
    }
    void Page2::RegisterEvents()
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
    void Page2::OnNavigationStarting(winrt::Microsoft::UI::Xaml::Controls::WebView2 const& sender, winrt::Microsoft::Web::WebView2::Core::CoreWebView2NavigationStartingEventArgs const& args)
    {
    }
    void Page2::OnNavigationCompleted(winrt::Microsoft::UI::Xaml::Controls::WebView2 const& sender, winrt::Microsoft::Web::WebView2::Core::CoreWebView2NavigationCompletedEventArgs const& args)
    {
        m_DownloadStarting_revoker = m_webview.CoreWebView2().DownloadStarting(winrt::auto_revoke, [ref = get_weak()](auto const& sender, auto const& args) {
            if (auto self = ref.get())
            {
                self->OnDownloadStarting(sender, args);
            }
            });
    }
    void Page2::OnDownloadStarting(Microsoft::Web::WebView2::Core::CoreWebView2 const& sender, Microsoft::Web::WebView2::Core::CoreWebView2DownloadStartingEventArgs const& args)
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
    void Page2::OnDwonloadStateChanged(winrt::Microsoft::Web::WebView2::Core::CoreWebView2DownloadOperation const& sender, winrt::Windows::Foundation::IInspectable const& args)
    {
        if (sender.State() == Microsoft::Web::WebView2::Core::CoreWebView2DownloadState::Completed)
        {
            InformationBar().Severity(Microsoft::UI::Xaml::Controls::InfoBarSeverity::Success);
            InformationBar().Title(L"Downloading:");
            InformationBar().Message(L"File Download into:" + m_webview_file_download_path);
            InformationBar().IsOpen(true);
        }
    }
    void Page2::Start_Simulaion_Button_Clicked(winrt::Windows::Foundation::IInspectable const& sender, winrt::Microsoft::UI::Xaml::RoutedEventArgs const& e)
    {
        float delta_t = 1;
        int iter_times = int(10/1);
    
        std::vector<float> find_value{1,2,3,4,5,6,7,10};
        
        //* 打包仿真间隔和参考转速
        hstring important_msg = PackImportantMessage(delta_t);
        hstring sub_msg = PackVectorMessage(find_value);
        m_webview.ExecuteScriptAsync(important_msg);
        m_webview.ExecuteScriptAsync(sub_msg);
        // Simulation_Progress().IsActive(false);
    }
}