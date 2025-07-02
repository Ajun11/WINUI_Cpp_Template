#include "pch.h"
#include "App.xaml.h"
#include "MainWindow.xaml.h"
using namespace winrt;
using namespace Microsoft::UI::Xaml;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace winrt::ControlSystem::implementation
{
    /// <summary>
    /// Initializes the singleton application object.  This is the first line of authored code
    /// executed, and as such is the logical equivalent of main() or WinMain().
    /// </summary>
    App::App()
    {
        // Xaml objects should not call InitializeComponent during construction.
        // See https://github.com/microsoft/cppwinrt/tree/master/nuget#initializecomponent

#if defined _DEBUG && !defined DISABLE_XAML_GENERATED_BREAK_ON_UNHANDLED_EXCEPTION
        UnhandledException([](IInspectable const&, UnhandledExceptionEventArgs const& e)
        {
            if (IsDebuggerPresent())
            {
                auto errorMessage = e.Message();
                __debugbreak();
            }
        });
#endif
    }

    /// <summary>
    /// Invoked when the application is launched.
    /// </summary>
    /// <param name="e">Details about the launch request and process.</param>
    void App::OnLaunched([[maybe_unused]] LaunchActivatedEventArgs const& e)
    {
        window = make<MainWindow>();
        window.Activate();
        m_WindowClosed_revoker = window.Closed(winrt::auto_revoke, [ref = get_weak()](auto const& sender, auto const& args) {
            if (auto self = ref.get())
            {
                self->OnWindowClosed(sender, args);
            }
            });
    }
    void App::OnWindowClosed(winrt::Windows::Foundation::IInspectable const& sender, Microsoft::UI::Xaml::WindowEventArgs const& args)
    {
        //* 清理非App文件下的静态变量，不然退出时base.h报错
        winrt::ControlSystem::implementation::MainPage::root_page_navView = nullptr;
        //* 实现之后编译右上角叉掉不会报错啦，所以其他的也可以这样在App这里设置关掉，这里是母window,所以只有在程序退出的时候才会全关掉
        if (Webview2_Page2_Initializing)
        {
            m_appwebview_page2.Close();
        }
        if (Webview2_Page3_Initializing)
        {
            m_appwebview_page3.Close();
        }
    }
}
