#include "pch.h"
#include "Page1.xaml.h"
//* XAML typwe header
#include <winrt/Windows.UI.Xaml.Interop.h>
//* Animation header
#include <winrt/Microsoft.UI.Xaml.Media.Animation.h>
#if __has_include("Page1.g.cpp")
#include "Page1.g.cpp"
#endif

using namespace winrt;
using namespace Microsoft::UI::Xaml;

// To learn more about WinUI, the WinUI project structure,
// and more about our project templates, see: http://aka.ms/winui-project-info.

namespace winrt::ControlSystem::implementation
{
	Page1::Page1()
	{
		InitializeComponent();
    }
}


void winrt::ControlSystem::implementation::Page1::FirstPage_Simulation_ParameterSet_Click(winrt::Windows::Foundation::IInspectable const& sender, winrt::Microsoft::UI::Xaml::RoutedEventArgs const& e)
{
	Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionInfo slideEffect = Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionInfo();
	slideEffect.Effect(Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionEffect(Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionEffect::FromRight));
	IInspectable transfer_para = box_value(L"Page1");
	this->Frame().Navigate(xaml_typename<winrt::ControlSystem::ParameterSet>(),transfer_para,slideEffect);
}


void winrt::ControlSystem::implementation::Page1::FirstPage_SimulationMode_FixedTime_Click(winrt::Windows::Foundation::IInspectable const& sender, winrt::Microsoft::UI::Xaml::RoutedEventArgs const& e)
{
	Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionInfo slideEffect = Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionInfo();
	slideEffect.Effect(Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionEffect(Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionEffect::FromBottom));
	winrt::ControlSystem::implementation::MainPage::root_page_navView.SelectedItem(winrt::ControlSystem::implementation::MainPage::root_page_navView.MenuItems().GetAt(1));
	this->Frame().Navigate(xaml_typename<winrt::ControlSystem::Page2>(),slideEffect);
}


void winrt::ControlSystem::implementation::Page1::FirstPage_SimulationModeSelectRealTime_Button_Click(winrt::Windows::Foundation::IInspectable const& sender, winrt::Microsoft::UI::Xaml::RoutedEventArgs const& e)
{
	Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionInfo slideEffect = Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionInfo();
	slideEffect.Effect(Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionEffect(Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionEffect::FromBottom));
	winrt::ControlSystem::implementation::MainPage::root_page_navView.SelectedItem(winrt::ControlSystem::implementation::MainPage::root_page_navView.MenuItems().GetAt(2));
	this->Frame().Navigate(xaml_typename<winrt::ControlSystem::Page3>(), slideEffect);
}
void winrt::ControlSystem::implementation::Page1::FirstPage_ToPage3_Button_Click(winrt::Windows::Foundation::IInspectable const& sender, winrt::Microsoft::UI::Xaml::RoutedEventArgs const& e)
{
	Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionInfo slideEffect = Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionInfo();
	slideEffect.Effect(Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionEffect(Microsoft::UI::Xaml::Media::Animation::SlideNavigationTransitionEffect::FromBottom));
	winrt::ControlSystem::implementation::MainPage::root_page_navView.SelectedItem(winrt::ControlSystem::implementation::MainPage::root_page_navView.MenuItems().GetAt(3));
	this->Frame().Navigate(xaml_typename<winrt::ControlSystem::Page4>(), slideEffect);
}
