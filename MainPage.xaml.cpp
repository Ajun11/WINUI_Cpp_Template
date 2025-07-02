#include "pch.h"
#include "MainPage.xaml.h"
#if __has_include("MainPage.g.cpp")
#include "MainPage.g.cpp"
#include <string>
#include <winrt/Windows.UI.Xaml.Interop.h> //For using xaml_typename
#endif

using namespace winrt;
using namespace Microsoft::UI::Xaml;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace winrt::ControlSystem::implementation
{
	MainPage::MainPage()
	{
		InitializeComponent();
	}
    //void MainPage::nvsample1_SelectionChanged(winrt::Microsoft::UI::Xaml::Controls::NavigationView const& sender, winrt::Microsoft::UI::Xaml::Controls::NavigationViewSelectionChangedEventArgs const& args)
    //{
    //    if (args.IsSettingsSelected())
    //    {
    //        contentFrame1().Navigate(xaml_typename<winrt::ControlSystem::SettingsPage>());
    //    }
    //    else if (args.SelectedItemContainer())
    //    {
    //        Windows::UI::Xaml::Interop::TypeName pageTypeName;
    //        //* unbox能够将IInspectable的信息解构，也能用box将信息保存为IInspectable
    //        pageTypeName.Name = unbox_value<hstring>(args.SelectedItemContainer().Tag());
    //        hstring index = unbox_value<hstring>(args.SelectedItemContainer().Tag());
    //        /*IInspectable sendmes = winrt::box_value(winrt::to_hstring(str2));
    //        sender.Header(sendmes);*/
    //        //pageTypeName.Kind = Windows::UI::Xaml::Interop::TypeKind::Primitive;
    //        NavView_Navigate(pageTypeName, args.RecommendedNavigationTransitionInfo());
    //    }
    //}

    void MainPage::nvsample1_ItemInvoked(winrt::Microsoft::UI::Xaml::Controls::NavigationView const& sender, winrt::Microsoft::UI::Xaml::Controls::NavigationViewItemInvokedEventArgs const& args)
    {
        if (args.IsSettingsInvoked() == true)
        {
            winrt::Windows::UI::Xaml::Interop::TypeName xamltypename = xaml_typename<winrt::ControlSystem::SettingsPage>();
            NavView_Navigate(xamltypename, args.RecommendedNavigationTransitionInfo());
        }
        else if (args.InvokedItemContainer() != nullptr)
        {
            Windows::UI::Xaml::Interop::TypeName pageTypeName;
            pageTypeName.Name = winrt::unbox_value<hstring>(args.InvokedItemContainer().Tag());
            if (pageTypeName.Name != L"")
            {
                NavView_Navigate(pageTypeName, args.RecommendedNavigationTransitionInfo());
            }
        }
    }
    void MainPage::nvsample1_Loaded(winrt::Windows::Foundation::IInspectable const& sender, winrt::Microsoft::UI::Xaml::RoutedEventArgs const& e)
    {
        //* If use selection_changed, we don't need navview_navigate, however selecteditem needs it.
        //* selectionchanged item  and selection_changed happends on click, so if we use custom buttom, we need to operate like this
        root_page_navView = nvsample1();
        nvsample1().SelectedItem(nvsample1().MenuItems().GetAt(0));
        NavView_Navigate(xaml_typename<winrt::ControlSystem::Page1>(), nullptr);
    }
    void MainPage::NavView_Navigate(
        Windows::UI::Xaml::Interop::TypeName navPageType,
        Microsoft::UI::Xaml::Media::Animation::NavigationTransitionInfo const& transitionInfo)
    {
        // Get the page type before navigation so you can prevent duplicate
        // entries in the backstack.
        Windows::UI::Xaml::Interop::TypeName preNavPageType = contentFrame1().CurrentSourcePageType();

        // Navigate only if the selected page isn't currently loaded.
        if (navPageType.Name != L"" && preNavPageType.Name != navPageType.Name)
        {
            contentFrame1().Navigate(navPageType, nullptr, transitionInfo);
        }
    }
}




