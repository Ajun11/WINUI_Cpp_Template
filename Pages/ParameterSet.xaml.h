#pragma once

#include "ParameterSet.g.h"

namespace winrt::ControlSystem::implementation
{
	struct ParameterSet : ParameterSetT<ParameterSet>
	{
		ParameterSet()
		{
			// Xaml objects should not call InitializeComponent during construction.
			// See https://github.com/microsoft/cppwinrt/tree/master/nuget#initializecomponent
		}
		void OnNavigatedTo(Microsoft::UI::Xaml::Navigation::NavigationEventArgs const& e);
		void BackwardButton_Click(winrt::Windows::Foundation::IInspectable const& sender, winrt::Microsoft::UI::Xaml::RoutedEventArgs const& e);
	private:
		hstring prepagename;
	};
}

namespace winrt::ControlSystem::factory_implementation
{
	struct ParameterSet : ParameterSetT<ParameterSet, implementation::ParameterSet>
	{
	};
}
